import { z } from "zod"
import { capacitorCorsHeaders } from "../capacitor-cors/capacitor-cors.module.code.ts"
import { unwritten } from "../pages-unheld/pages-unheld.module.code.ts"
import type { Route } from "./+types/api.sms.opt-in"

const CORS_METHODS = "POST, OPTIONS"

const CONSENT_PAGE_TYPE_SLUG = "sms-consent"

export function consentNamed(e164: string, submittedAt: string): string {
  return `${e164.replace(/\D/g, "")}-${submittedAt.slice(0, 10)}`
}

const BodySchema = z
  .object({
    name: z.string().trim().min(1).max(200),
    phone: z.string().trim().min(1).max(40),
    consent: z.literal(true),
    website: z.string().max(200).optional(),
  })
  .strict()

function toE164Us(raw: string): string | null {
  let digits = raw.replace(/\D/g, "")
  if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1)
  return digits.length === 10 ? `+1${digits}` : null
}

export async function loader({ request }: Route.LoaderArgs): Promise<Response> {
  const cors = capacitorCorsHeaders(request, CORS_METHODS)
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors })
  }
  return Response.json({ error: "Method not allowed" }, { status: 405, headers: cors })
}

export async function action({ request }: Route.ActionArgs): Promise<Response> {
  const cors = capacitorCorsHeaders(request, CORS_METHODS)
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405, headers: cors })
  }

  let raw: unknown
  try {
    raw = await request.json()
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400, headers: cors })
  }

  const parsed = BodySchema.safeParse(raw)
  if (!parsed.success) {
    return Response.json(
      {
        error:
          "Please enter your name, a valid mobile number, and check the box to agree to receive messages.",
      },
      { status: 400, headers: cors }
    )
  }
  const { phone, website } = parsed.data

  if (website != null && website.length > 0) {
    return Response.json({ ok: true }, { headers: cors })
  }

  const e164 = toE164Us(phone)
  if (e164 === null) {
    return Response.json(
      { error: "Please enter a valid 10-digit US mobile number." },
      { status: 400, headers: cors }
    )
  }

  // A CONSENT THAT WENT UNRECORDED IS NEVER ANSWERED `{ok: true}`. This wrote an `sms-consent`
  // page — the name, the number, the text version agreed to, the moment, the address and the
  // agent it came from — through `@shared/pages-query`, into this pod's own checkout. That reach
  // is severed, and `sms-consent` is no page type the pages system service holds.
  //
  // The consent page is the record that this person said yes, and it is the record the carrier
  // asks for. Answering `{ok: true}` would tell the visitor they are signed up and leave nothing
  // behind saying they ever agreed, which is the one failure here that reaches past this app.
  const named = consentNamed(e164, new Date().toISOString())
  const why = unwritten(CONSENT_PAGE_TYPE_SLUG, `the consent named \`${named}\``)
  return Response.json(
    { error: `Could not record your consent: ${why}` },
    { status: 503, headers: cors }
  )
}
