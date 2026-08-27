import { createHmac, timingSafeEqual } from "node:crypto"
import { z } from "zod"

const TOKEN_DOMAIN = "media:v1"

export type MediaTokenScope = {
  pageId: string
  medium: string
  variant: string
}

const mediaTokenSecretSchema = z.string().default("")

export function mediaTokenSecret(): string {
  return mediaTokenSecretSchema.parse(process.env.SUPABASE_JWT_SECRET)
}

function signature(scope: MediaTokenScope, exp: number, secret: string): Buffer {
  const message = `${TOKEN_DOMAIN}:${scope.pageId}:${scope.medium}:${scope.variant}:${exp}`
  return createHmac("sha256", secret).update(message).digest()
}

export function mintMediaToken(
  scope: MediaTokenScope,
  expMs: number,
  secret: string
): string | null {
  if (secret.length === 0) return null
  const sig = signature(scope, expMs, secret).toString("base64url")
  return `${expMs}.${sig}`
}

export function verifyMediaToken(token: string, scope: MediaTokenScope, secret: string): boolean {
  if (secret.length === 0) return false

  const dot = token.indexOf(".")
  if (dot <= 0 || dot === token.length - 1) return false
  const expPart = token.slice(0, dot)
  const sigPart = token.slice(dot + 1)

  if (!/^\d+$/.test(expPart)) return false
  const exp = Number(expPart)
  if (!Number.isSafeInteger(exp) || exp <= Date.now()) return false

  let presented: Buffer
  try {
    presented = Buffer.from(sigPart, "base64url")
  } catch {
    return false
  }
  const expected = signature(scope, exp, secret)
  if (presented.length !== expected.length) return false
  return timingSafeEqual(presented, expected)
}
