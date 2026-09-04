import { timingSafeEqual } from "node:crypto"
import { z } from "zod"

const GIT_ACCESS_TOKEN = z.string().default("").parse(process.env.GIT_ACCESS_TOKEN)

export function authenticate(req: Request): { remoteUser: string } | null {
  const authHeader = req.headers.get("authorization")
  if (authHeader?.startsWith("Basic ")) {
    const decoded = atob(authHeader.slice(6))
    const colonIndex = decoded.indexOf(":")
    if (colonIndex !== -1) {
      const user = decoded.slice(0, colonIndex)
      const password = decoded.slice(colonIndex + 1)
      if (user === "x-access-token" && GIT_ACCESS_TOKEN !== "") {
        try {
          const passwordBuf = Buffer.from(password)
          const tokenBuf = Buffer.from(GIT_ACCESS_TOKEN)
          if (passwordBuf.length === tokenBuf.length && timingSafeEqual(passwordBuf, tokenBuf)) {
            return { remoteUser: "x-access-token" }
          }
        } catch {
          return null
        }
      }
    }
    return null
  }

  const forwardedUser = req.headers.get("x-forwarded-user")
  if (forwardedUser != null) {
    return { remoteUser: forwardedUser }
  }

  return null
}
