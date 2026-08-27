import { loadSmsExternalIdentities } from "@alanwalton/sms-access/sms-allowlist"
import { recordSmsDiscard } from "@alanwalton/sms-access/sms-discard"
import { handleInboundSms } from "@alanwalton/sms-core/handle-inbound"
import { writePage } from "@shared/pages-query"
import { createServiceRoleClient } from "../../../../shared/supabase-server/src/service-role"
import { z } from "zod"
import type { Route } from "./+types/api.sms.webhook"

export async function action({ request }: Route.ActionArgs): Promise<Response> {
  if (request.method !== "POST") {
    return Response.json({ error: "method-not-allowed" }, { status: 405 })
  }

  const publicKey = z.string().min(1).safeParse(process.env.TELNYX_PUBLIC_KEY)
  if (!publicKey.success) {
    return Response.json({ error: "sms-webhook-not-configured" }, { status: 503 })
  }

  const rawBody = await request.text()
  const signatureBase64 = request.headers.get("telnyx-signature-ed25519")
  const timestamp = request.headers.get("telnyx-timestamp")

  const outcome = await handleInboundSms(
    {
      rawBody,
      signatureBase64,
      timestamp,
      publicKeyBase64: publicKey.data,
      loadIdentities: () => loadSmsExternalIdentities(createServiceRoleClient()),
      nowMs: Date.now(),
    },
    async (target, content, kind) => {
      const source =
        kind === "refusal-notice" || target === "amy" ? "alanwalton-web" : `sms:${target}`
      const written = await writePage(
        "message",
        `${target}/${crypto.randomUUID()}`,
        { to: target, from: source, warrant: "announce", body: content },
        source
      )
      if (!written.ok) {
        return {
          kind: "no-such-seat",
          reason: `message for '${target}' did not land: ${written.why}`,
        }
      }
      return { kind: "landed" }
    },
    (discard) => recordSmsDiscard(discard)
  )

  if (outcome.kind === "rejected") {
    return Response.json({ error: outcome.reason }, { status: outcome.status })
  }
  return Response.json({ status: outcome.kind }, { status: 200 })
}
