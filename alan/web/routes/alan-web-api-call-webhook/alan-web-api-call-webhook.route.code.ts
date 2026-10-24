import {
  expectCall,
  STREAM_LEG,
  spouseCalling,
} from "akasha/alan/couples-therapy/couples-call/modules/room/couples-call-room.module.code.ts"
import { verifyTelnyxSignature } from "akasha/alan/harness/sms-core/modules/verify-signature/verify-signature.module.code.ts"
import { optionalEnv } from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { objectIn } from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

const CALLS_AT = "https://api.telnyx.com/v2/calls"

const STREAM_AT = "wss://webhook.alanwalton.com/api/call/stream"

const SIGNATURE_HEADER = "telnyx-signature-ed25519"

const TIMESTAMP_HEADER = "telnyx-timestamp"

const INITIATED = "call.initiated"

const INCOMING = "incoming"

type Said = Readonly<Record<string, unknown>>

async function commanded(id: string, act: string, body: Said, key: string): Promise<string | null> {
  try {
    const answered = await fetch(`${CALLS_AT}/${encodeURIComponent(id)}/actions/${act}`, {
      method: "POST",
      headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
      body: JSON.stringify(body),
    })
    if (answered.ok) return null
    return `Telnyx answered ${act} with ${answered.status}: ${(await answered.text()).slice(0, 300)}`
  } catch (cause) {
    return `Telnyx was not reached to ${act} (${String(cause)})`
  }
}

export async function action({ request }: { request: Request }): Promise<Response> {
  if (request.method !== "POST") {
    return Response.json({ error: "method-not-allowed" }, { status: 405 })
  }
  const rawBody = await request.text()
  const publicKey = optionalEnv("TELNYX_PUBLIC_KEY")
  const key = optionalEnv("TELNYX_API_KEY")
  if (publicKey === undefined || key === undefined) {
    return Response.json({ error: "no-telnyx-keys" }, { status: 503 })
  }
  const verified = await verifyTelnyxSignature({
    publicKeyBase64: publicKey,
    signatureBase64: request.headers.get(SIGNATURE_HEADER),
    timestamp: request.headers.get(TIMESTAMP_HEADER),
    rawBody,
    nowMs: Date.now(),
  })
  if (!verified.ok) return Response.json({ error: verified.reason }, { status: 403 })

  let parsed: unknown
  try {
    parsed = JSON.parse(rawBody)
  } catch {
    return Response.json({ error: "unreadable-body" }, { status: 400 })
  }
  const data = objectIn(objectIn(parsed)?.data)
  const payload = objectIn(data?.payload)
  const id = textIn(payload?.call_control_id)
  const from = textIn(payload?.from)
  if (data?.event_type !== INITIATED || payload?.direction !== INCOMING || id === null) {
    return Response.json({ ok: true, outcome: "not-acted-on" })
  }

  const spouse = from === null ? null : await spouseCalling(from)
  if (spouse !== null && typeof spouse === "object") {
    return Response.json({ error: spouse.refused }, { status: 503 })
  }
  if (spouse === null) {
    const refused = await commanded(id, "reject", { cause: "CALL_REJECTED" }, key)
    if (refused !== null) console.error(`[couples-call] ${refused}`)
    return Response.json({ ok: true, outcome: "rejected" })
  }

  const leg = expectCall(id, spouse)
  const refused = await commanded(
    id,
    "answer",
    {
      stream_url: `${STREAM_AT}?${STREAM_LEG}=${encodeURIComponent(leg)}`,
      stream_track: "inbound_track",
      stream_bidirectional_mode: "rtp",
      stream_bidirectional_codec: "PCMU",
    },
    key
  )
  if (refused !== null) {
    console.error(`[couples-call] ${refused}`)
    return Response.json({ error: refused }, { status: 502 })
  }
  return Response.json({ ok: true, outcome: "answered" })
}
