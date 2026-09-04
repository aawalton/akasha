import { z } from "zod"

export const PROACTIVE_REFRESH_MARGIN_MS = 120_000

const JwtPayloadExpSchema = z.object({ exp: z.number() }).passthrough()

export function decodeJwtExpMs(jwt: string): number | null {
  const parts = jwt.split(".")
  const payload = parts[1]
  if (parts.length !== 3 || payload === undefined) return null
  try {
    const parsed = JwtPayloadExpSchema.parse(
      JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")))
    )
    return parsed.exp * 1000
  } catch {
    return null
  }
}

export function computeProactiveRefreshDelayMs(
  jwt: string,
  nowMs: number,
  marginMs: number
): number | null {
  const expMs = decodeJwtExpMs(jwt)
  if (expMs === null) return null
  return Math.max(0, expMs - marginMs - nowMs)
}
