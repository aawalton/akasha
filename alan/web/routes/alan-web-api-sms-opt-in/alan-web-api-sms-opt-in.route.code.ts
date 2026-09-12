import { capacitorCorsHeaders } from "akasha/alan/web/capacitor-cors/capacitor-cors.module.code.ts"
import { writingFor } from "akasha/pages/service/page-calling/page-calling.module.code.ts"
import { CONSENT_TEXT_VERSION } from "akasha/persons/sms-consent/sms-consent.module.code.ts"
import { z } from "zod"

const CORS_METHODS = "POST, OPTIONS"

const CONSENT_PAGE_TYPE_SLUG = "sms-consent"

const CONSENT_WRITER = "alanwalton web <web@alanwalton.com>"

const ADDRESS_HOLDS = 45

const AGENT_HOLDS = 500

function consentNamed(e164: string, submittedAt: string): string {
  const digits = e164.replace(/\D/g, "")
  return `${CONSENT_PAGE_TYPE_SLUG}-${digits}-${submittedAt.slice(0, 10)}`
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

function addressOf(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
  if (forwarded !== undefined && forwarded !== "") return forwarded.slice(0, ADDRESS_HOLDS)
  const real = request.headers.get("x-real-ip")?.trim()
  return real === undefined || real === "" ? null : real.slice(0, ADDRESS_HOLDS)
}

function agentOf(request: Request): string | null {
  const said = request.headers.get("user-agent")?.trim()
  return said === undefined || said === "" ? null : said.slice(0, AGENT_HOLDS)
}

export async function loader({ request }: { request: Request }): Promise<Response> {
  const cors = capacitorCorsHeaders(request, CORS_METHODS)
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors })
  }
  return Response.json({ error: "Method not allowed" }, { status: 405, headers: cors })
}

export async function action({ request }: { request: Request }): Promise<Response> {
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
  const { name, phone, website } = parsed.data

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

  const submittedAt = new Date().toISOString()
  const named = consentNamed(e164, submittedAt)
  const address = addressOf(request)
  const agent = agentOf(request)
  const wrote = await writingFor({
    writer: CONSENT_WRITER,
    message: `the consent named \`${named}\` is written down`,
    pages: [
      {
        pageTypeSlug: CONSENT_PAGE_TYPE_SLUG,
        slug: named,
        values: {
          pageTypeSlug: CONSENT_PAGE_TYPE_SLUG,
          slug: named,
          title: name,
          phone: e164,
          consent: true,
          consentTextVersion: CONSENT_TEXT_VERSION,
          submittedAt,
          ...(address === null ? {} : { ipAddress: address }),
          ...(agent === null ? {} : { userAgent: agent }),
        },
      },
    ],
  })
  if ("refused" in wrote) {
    return Response.json(
      { error: `Could not record your consent: ${wrote.refused}` },
      { status: 503, headers: cors }
    )
  }
  return Response.json({ ok: true }, { headers: cors })
}
