export const READOUT_CACHE_CONTROL = "no-store"

const REFUSAL_BODY_NAMING_NO_REASON = { ok: false, error: "Not authenticated." } as const

export function buildReadoutRefusal(): Response {
  return Response.json(REFUSAL_BODY_NAMING_NO_REASON, {
    status: 401,
    headers: { "Cache-Control": READOUT_CACHE_CONTROL },
  })
}
