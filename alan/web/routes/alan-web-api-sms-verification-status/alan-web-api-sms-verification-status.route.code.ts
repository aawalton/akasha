import { verifyTelnyxSignature } from "akasha/alan/harness/sms-core/verify-signature/verify-signature.module.code.ts"
import { writingFor } from "akasha/pages/service/page-calling/page-calling.module.code.ts"

const MESSAGE_PAGE_TYPE_SLUG = "message"

const HANDLER_SEAT = "alan"

const STATUS_WRITER = "alanwalton web <web@alanwalton.com>"

const SIGNATURE_HEADER = "telnyx-signature-ed25519"

const TIMESTAMP_HEADER = "telnyx-timestamp"

const SAID_FROM = "telnyx-verification"

const BODY_HOLDS = 20000

const OPENS_WITH =
  "Telnyx posted a toll-free verification status. The payload it sent follows whole."

export function messageNamed(said: string): string {
  return `${MESSAGE_PAGE_TYPE_SLUG}-${said.replace(/[^0-9a-f]/g, "").slice(0, 12)}`
}

export async function action({ request }: { request: Request }): Promise<Response> {
  if (request.method !== "POST") {
    return Response.json({ error: "method-not-allowed" }, { status: 405 })
  }

  const rawBody = await request.text()

  const publicKey = process.env.TELNYX_PUBLIC_KEY
  if (publicKey === undefined || publicKey === "") {
    return Response.json({ error: "no-telnyx-public-key" }, { status: 503 })
  }

  const verified = await verifyTelnyxSignature({
    publicKeyBase64: publicKey,
    signatureBase64: request.headers.get(SIGNATURE_HEADER),
    timestamp: request.headers.get(TIMESTAMP_HEADER),
    rawBody,
    nowMs: Date.now(),
  })
  if (!verified.ok) {
    return Response.json({ error: verified.reason }, { status: 403 })
  }

  const named = messageNamed(crypto.randomUUID())
  const wrote = await writingFor({
    writer: STATUS_WRITER,
    message: `a toll-free verification status reaches the ${HANDLER_SEAT} seat`,
    pages: [
      {
        pageTypeSlug: MESSAGE_PAGE_TYPE_SLUG,
        slug: named,
        values: {
          pageTypeSlug: MESSAGE_PAGE_TYPE_SLUG,
          slug: named,
          to: HANDLER_SEAT,
          from: SAID_FROM,
          warrant: "announce",
          body: `${OPENS_WITH}\n\n${rawBody}`.slice(0, BODY_HOLDS),
        },
      },
    ],
  })
  if ("refused" in wrote) {
    return Response.json({ error: wrote.refused }, { status: 503 })
  }

  return Response.json({ ok: true })
}
