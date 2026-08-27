import { describe, expect, test } from "bun:test"
import { z } from "zod"

const disabled = z.string().optional().parse(process.env.GOTRUE_SMOKE_DISABLED) !== undefined

if (disabled) {
  console.log("[smoke skip] @infra/k8s gotrue jwks-public: GOTRUE_SMOKE_DISABLED set")
}

describe.skipIf(disabled)("gotrue public jwks smoke", () => {
  test("/.well-known/jwks.json returns a valid RS256 JWK", async () => {
    const res = await fetch("https://supabase.alanwalton.com/auth/v1/.well-known/jwks.json", {
      signal: AbortSignal.timeout(15_000),
    })
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body).toHaveProperty("keys")
    expect(Array.isArray(body.keys)).toBe(true)
    expect(body.keys.length).toBeGreaterThanOrEqual(1)
    const jwk = body.keys[0]
    expect(jwk.kty).toBe("RSA")
    expect(jwk.alg).toBe("RS256")
    expect(typeof jwk.kid).toBe("string")
  }, 15_000)
})
