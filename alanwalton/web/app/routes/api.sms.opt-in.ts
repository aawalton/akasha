import { writePage } from "@shared/pages-query"
import { z } from "zod"
import { capacitorCorsHeaders } from "~/lib/capacitor-cors"
import { CONSENT_TEXT_VERSION } from "~/sms/consent-copy"
import type { Route } from "./+types/api.sms.opt-in"

const CORS_METHODS = "POST, OPTIONS"

const CONSENT_PAGE_TYPE_SLUG = "sms-consent"
const WRITER = "sms-opt-in"

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
  const ipAddress =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    null
  const userAgent = request.headers.get("user-agent") ?? null

  const landed = await writePage(
    CONSENT_PAGE_TYPE_SLUG,
    consentNamed(e164, submittedAt),
    {
      title: `SMS consent — ${name} — ${submittedAt.slice(0, 10)}`,
      name,
      phone: e164,
      consent: true,
      "consent-text-version": CONSENT_TEXT_VERSION,
      "submitted-at": submittedAt,
      ...(ipAddress === null ? {} : { "ip-address": ipAddress }),
      ...(userAgent === null ? {} : { "user-agent": userAgent }),
    },
    WRITER
  )
  if (!landed.ok) {
    return Response.json(
      { error: `Could not record your consent: ${landed.why}` },
      { status: 500, headers: cors }
    )
  }

  return Response.json({ ok: true }, { headers: cors })
}
