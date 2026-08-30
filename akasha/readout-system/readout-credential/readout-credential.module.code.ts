import { timingSafeEqual } from "node:crypto"
import { z } from "zod"

export const READOUT_CACHE_CONTROL = "no-store"

export const RELAY_SECRET_HEADER = "X-Relay-Secret"

export const RING_CREDENTIAL_HEADER = "X-Ring-Credential"

const REFUSAL_BODY_NAMING_NO_REASON = { ok: false, error: "Not authenticated." } as const

export function buildReadoutRefusal(): Response {
  return Response.json(REFUSAL_BODY_NAMING_NO_REASON, {
    status: 401,
    headers: { "Cache-Control": READOUT_CACHE_CONTROL },
  })
}

const configuredSecret = z
  .string()
  .trim()
  .optional()
  .transform((value) => (value === undefined || value === "" ? undefined : value))

function constantTimeEquals(a: string, b: string): boolean {
  const left = Buffer.from(a, "utf8")
  const right = Buffer.from(b, "utf8")
  if (left.length !== right.length) return false
  return timingSafeEqual(left, right)
}

export function presentsSecret(
  request: Request,
  header: string,
  configured: string | undefined
): boolean {
  const expected = configuredSecret.parse(configured)
  if (expected === undefined) return false
  const presented = request.headers.get(header)
  if (presented === null) return false
  return constantTimeEquals(presented, expected)
}

export function refuseWithoutSecret(
  request: Request,
  header: string,
  configured: string | undefined
): Response | null {
  return presentsSecret(request, header, configured) ? null : buildReadoutRefusal()
}
