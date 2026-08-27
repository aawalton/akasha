import { describe, expect, test } from "bun:test"
import { type AppCspConfig, buildSecurityHeaders } from "./build"

const NONCE = "test-nonce-abc123"

function csp(config: AppCspConfig, nonce = NONCE): string {
  const headers = buildSecurityHeaders(config, nonce)
  const value = headers["Content-Security-Policy"]
  if (value === undefined) throw new Error("missing CSP header")
  return value
}

function directiveOf(policy: string, name: string): string | undefined {
  return policy
    .split(";")
    .map((d) => d.trim())
    .find((d) => d === name || d.startsWith(`${name} `))
}

describe("buildSecurityHeaders", () => {
  test("emits all six security headers", () => {
    const headers = buildSecurityHeaders({}, NONCE)
    expect(Object.keys(headers).sort()).toEqual(
      [
        "Content-Security-Policy",
        "Permissions-Policy",
        "Referrer-Policy",
        "Strict-Transport-Security",
        "X-Content-Type-Options",
        "X-Frame-Options",
      ].sort()
    )
  })

  test("static header values are exact", () => {
    const h = buildSecurityHeaders({}, NONCE)
    expect(h["X-Frame-Options"]).toBe("DENY")
    expect(h["X-Content-Type-Options"]).toBe("nosniff")
    expect(h["Strict-Transport-Security"]).toBe("max-age=31536000; includeSubDomains")
    expect(h["Referrer-Policy"]).toBe("strict-origin-when-cross-origin")
    expect(h["Permissions-Policy"]).toBe(
      "camera=(), microphone=(), geolocation=(), interest-cohort=()"
    )
  })

  test("script-src is nonce + strict-dynamic and never 'unsafe-inline'", () => {
    const scriptSrc = directiveOf(csp({}), "script-src")
    expect(scriptSrc).toBe(`script-src 'self' 'nonce-${NONCE}' 'strict-dynamic'`)
    expect(scriptSrc).not.toContain("'unsafe-inline'")
    expect(scriptSrc).not.toContain("'unsafe-eval'")
  })

  test("nonce is threaded from the argument", () => {
    expect(csp({}, "NONCE-A")).toContain("'nonce-NONCE-A'")
    expect(csp({}, "NONCE-B")).toContain("'nonce-NONCE-B'")
    expect(csp({}, "NONCE-A")).not.toContain("'nonce-NONCE-B'")
  })

  test("style-src carries 'unsafe-inline' (allowed for styles only)", () => {
    expect(directiveOf(csp({}), "style-src")).toBe("style-src 'self' 'unsafe-inline'")
  })

  test("baseline hardening directives are always present", () => {
    const policy = csp({})
    expect(directiveOf(policy, "default-src")).toBe("default-src 'self'")
    expect(directiveOf(policy, "font-src")).toBe("font-src 'self'")
    expect(directiveOf(policy, "object-src")).toBe("object-src 'none'")
    expect(directiveOf(policy, "base-uri")).toBe("base-uri 'none'")
    expect(directiveOf(policy, "frame-ancestors")).toBe("frame-ancestors 'none'")
    expect(directiveOf(policy, "form-action")).toBe("form-action 'self'")
  })

  test("img-src is 'self' data: by default and merges extras", () => {
    expect(directiveOf(csp({}), "img-src")).toBe("img-src 'self' data:")
    expect(directiveOf(csp({ imgSrc: ["https://esoicons.uesp.net"] }), "img-src")).toBe(
      "img-src 'self' data: https://esoicons.uesp.net"
    )
  })

  test("connect-src merges the supabase https + wss hosts", () => {
    const policy = csp({
      connectSrc: ["https://supabase.alanwalton.com", "wss://supabase.alanwalton.com"],
    })
    expect(directiveOf(policy, "connect-src")).toBe(
      "connect-src 'self' https://supabase.alanwalton.com wss://supabase.alanwalton.com"
    )
  })

  test("connect-src defaults to 'self' only when no extras given", () => {
    expect(directiveOf(csp({}), "connect-src")).toBe("connect-src 'self'")
  })

  test("media-src and worker-src are omitted unless extras are supplied", () => {
    const bare = csp({})
    expect(directiveOf(bare, "media-src")).toBeUndefined()
    expect(directiveOf(bare, "worker-src")).toBeUndefined()

    expect(directiveOf(csp({ mediaSrc: ["blob:"] }), "media-src")).toBe("media-src 'self' blob:")
    expect(directiveOf(csp({ workerSrc: ["blob:"] }), "worker-src")).toBe("worker-src 'self' blob:")
  })

  test("empty extra arrays do not emit optional directives", () => {
    const policy = csp({ mediaSrc: [], workerSrc: [] })
    expect(directiveOf(policy, "media-src")).toBeUndefined()
    expect(directiveOf(policy, "worker-src")).toBeUndefined()
  })

  test("atlas-shape config produces the expected connect/img/worker set", () => {
    const policy = csp({
      connectSrc: [
        "https://supabase.alanwalton.com",
        "wss://supabase.alanwalton.com",
        "https://protomaps.github.io",
      ],
      imgSrc: ["blob:", "https://protomaps.github.io"],
      workerSrc: ["blob:"],
    })
    expect(directiveOf(policy, "connect-src")).toContain("https://protomaps.github.io")
    expect(directiveOf(policy, "img-src")).toBe(
      "img-src 'self' data: blob: https://protomaps.github.io"
    )
    expect(directiveOf(policy, "worker-src")).toBe("worker-src 'self' blob:")
  })
})
