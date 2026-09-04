import { z } from "zod"

const JwtPayloadSubSchema = z.object({ sub: z.string() }).passthrough()

export function decodeJwtSub(jwt: string): string | null {
  const parts = jwt.split(".")
  const payload = parts[1]
  if (parts.length !== 3 || payload === undefined) return null
  try {
    const parsed = JwtPayloadSubSchema.parse(
      JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")))
    )
    return parsed.sub
  } catch {
    return null
  }
}
