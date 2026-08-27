import { describe, expect, test } from "bun:test"
import { applyCorsHeadersWith } from "./cors-core"
import { buildBadGatewayResponse } from "./proxy-core"

const ALLOWED_ORIGINS = ["https://alanwalton.com"] as const
const ALLOWED_PATTERNS: readonly RegExp[] = []

const ALLOWED = "https://alanwalton.com"
const DENIED = "https://evil.example.com"

describe("upstream-failure 502 through the path-route CORS applicator (/auth/v1)", () => {
  test("allowlisted origin: 502 carries ACAO", () => {
    const wrapped = applyCorsHeadersWith(
      buildBadGatewayResponse(),
      ALLOWED,
      ALLOWED_ORIGINS,
      ALLOWED_PATTERNS
    )
    expect(wrapped.status).toBe(502)
    expect(wrapped.headers.get("access-control-allow-origin")).toBe(ALLOWED)
    expect(wrapped.headers.get("access-control-allow-credentials")).toBe("true")
  })

  test("non-allowlisted origin: 502 has NO ACAO", () => {
    const wrapped = applyCorsHeadersWith(
      buildBadGatewayResponse(),
      DENIED,
      ALLOWED_ORIGINS,
      ALLOWED_PATTERNS
    )
    expect(wrapped.status).toBe(502)
    expect(wrapped.headers.get("access-control-allow-origin")).toBeNull()
  })
})
