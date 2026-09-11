import {
  type DeliverEffect,
  handleInboundSms,
  type RecordDiscardEffect,
} from "akasha/alan/harness/sms-core/handle-inbound/handle-inbound.module.code.ts"
import {
  projectSmsIdentities,
  type SmsExternalIdentity,
} from "akasha/alan/harness/sms-core/sms-identity/sms-identity.module.code.ts"
import {
  extractInboundSms,
  telnyxWebhookSchema,
} from "akasha/alan/harness/sms-core/telnyx-inbound/telnyx-inbound.module.code.ts"
import { verifyTelnyxSignature } from "akasha/alan/harness/sms-core/verify-signature/verify-signature.module.code.ts"
import {
  askingFor,
  writingFor,
} from "akasha/pages/service/page-calling/page-calling.module.code.ts"
import { messageNamed } from "akasha/seat-system/messaging/message-naming/message-naming.module.code.ts"

const MESSAGE_PAGE_TYPE_SLUG = "message"

const SEAT_PAGE_TYPE_SLUG = "seat"

const RELATIONSHIP_PAGE_TYPE_SLUG = "relationship"

const INBOUND_WRITER = "alanwalton web <web@alanwalton.com>"

const SAID_FROM = "telnyx-sms"

const HANDLER_SEAT = "alan"

const SIGNATURE_HEADER = "telnyx-signature-ed25519"

const TIMESTAMP_HEADER = "telnyx-timestamp"

const RECEIVED = "message.received"

const BODY_HOLDS = 20000

const CARRIER_ANSWERS: readonly string[] = ["help", "info", "start"]

const RELATIONSHIP_KEYS: readonly string[] = [
  "relationshipPhone",
  "relationshipAccountUserId",
  "relationshipSmsAllowed",
  "relationshipSmsHandlerTarget",
]

const SEAT_KEYS: readonly string[] = ["slug"]

const DISCARD_OPENS_WITH =
  "A text reached the toll-free number from a number nobody enrolled, and nothing was delivered."

type Row = Readonly<Record<string, unknown>>

function saidIn(held: unknown): string | undefined {
  return typeof held === "string" && held !== "" ? held : undefined
}

export function answeredByCarrier(rawBody: string): boolean {
  let parsed: ReturnType<typeof telnyxWebhookSchema.safeParse>
  try {
    parsed = telnyxWebhookSchema.safeParse(JSON.parse(rawBody))
  } catch {
    return false
  }
  if (!parsed.success) return false
  const sms = extractInboundSms(parsed.data)
  if (sms.eventType !== RECEIVED) return false
  return CARRIER_ANSWERS.includes(sms.text.trim().toLowerCase())
}

export function identitiesIn(rows: readonly Row[]): readonly SmsExternalIdentity[] {
  return projectSmsIdentities(
    rows.map((row) => ({
      phone: saidIn(row.relationshipPhone),
      accountUserId: saidIn(row.relationshipAccountUserId),
      smsAllowed: row.relationshipSmsAllowed === true,
      smsHandlerTarget: saidIn(row.relationshipSmsHandlerTarget) ?? null,
    }))
  )
}

async function messageTo(to: string, body: string): Promise<string | null> {
  const id = crypto.randomUUID()
  const named = messageNamed(id)
  const wrote = await writingFor({
    writer: INBOUND_WRITER,
    message: `a text reaches the ${to} seat`,
    pages: [
      {
        pageTypeSlug: MESSAGE_PAGE_TYPE_SLUG,
        slug: named,
        values: {
          id,
          pageTypeSlug: MESSAGE_PAGE_TYPE_SLUG,
          slug: named,
          to,
          from: SAID_FROM,
          warrant: "announce",
          body: body.slice(0, BODY_HOLDS),
        },
      },
    ],
  })
  return "refused" in wrote ? wrote.refused : null
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

  const signatureBase64 = request.headers.get(SIGNATURE_HEADER)
  const timestamp = request.headers.get(TIMESTAMP_HEADER)
  const verified = await verifyTelnyxSignature({
    publicKeyBase64: publicKey,
    signatureBase64,
    timestamp,
    rawBody,
    nowMs: Date.now(),
  })
  if (!verified.ok) {
    return Response.json({ error: verified.reason }, { status: 403 })
  }

  if (answeredByCarrier(rawBody)) {
    return Response.json({ ok: true, outcome: "the-carrier-answers-this" })
  }

  const asked = await askingFor({
    pageTypeSlug: RELATIONSHIP_PAGE_TYPE_SLUG,
    keys: RELATIONSHIP_KEYS,
  })
  if ("refused" in asked) {
    return Response.json({ error: asked.refused }, { status: 503 })
  }

  const seats = await askingFor({ pageTypeSlug: SEAT_PAGE_TYPE_SLUG, keys: SEAT_KEYS })
  if ("refused" in seats) {
    return Response.json({ error: seats.refused }, { status: 503 })
  }

  const seated = new Set(
    seats.rows.map((row) => saidIn(row.slug)).filter((slug): slug is string => slug !== undefined)
  )
  const identities = identitiesIn(asked.rows)
  const held: { unlanded: string | null } = { unlanded: null }

  const deliver: DeliverEffect = async (targetAgent, content) => {
    if (!seated.has(targetAgent)) {
      return { kind: "no-such-seat", reason: `no seat holds the name \`${targetAgent}\`` }
    }
    const refused = await messageTo(targetAgent, content)
    if (refused === null) return { kind: "landed" }
    held.unlanded = refused
    return { kind: "no-such-seat", reason: refused }
  }

  const recordDiscard: RecordDiscardEffect = async (discard) => {
    const refused = await messageTo(
      HANDLER_SEAT,
      `${DISCARD_OPENS_WITH}\n\nsender ${discard.sender}\nreason ${discard.reason}`
    )
    if (refused === null) return { kind: "recorded" }
    held.unlanded = refused
    return { kind: "not-recorded", reason: refused }
  }

  const outcome = await handleInboundSms(
    {
      rawBody,
      signatureBase64,
      timestamp,
      publicKeyBase64: publicKey,
      loadIdentities: () => Promise.resolve(identities),
      nowMs: Date.now(),
    },
    deliver,
    recordDiscard
  )

  if (held.unlanded !== null) {
    return Response.json({ error: held.unlanded }, { status: 503 })
  }
  if (outcome.kind === "rejected") {
    return Response.json({ error: outcome.reason }, { status: outcome.status })
  }
  return Response.json({ ok: true, outcome: outcome.kind, reason: outcome.reason })
}
