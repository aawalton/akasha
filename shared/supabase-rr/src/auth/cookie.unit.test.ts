import { describe, expect, test } from "bun:test"
import { hasSessionCookie } from "./cookie"

describe("hasSessionCookie", () => {
  test("returns false for null", () => {
    expect(hasSessionCookie(null)).toBe(false)
  })

  test("returns false for empty string", () => {
    expect(hasSessionCookie("")).toBe(false)
  })

  test("returns false when no sb-*-auth-token cookie is present", () => {
    expect(hasSessionCookie("other=value; foo=bar")).toBe(false)
  })

  test("returns true for an sb-<ref>-auth-token cookie with a value", () => {
    expect(hasSessionCookie("sb-abc123-auth-token=eyJ...")).toBe(true)
  })

  test("returns true for a chunked sb-<ref>-auth-token.0 cookie", () => {
    expect(hasSessionCookie("sb-abc123-auth-token.0=part0; sb-abc123-auth-token.1=part1")).toBe(
      true
    )
  })

  test("returns false when the value is empty", () => {
    expect(hasSessionCookie("sb-abc123-auth-token=")).toBe(false)
  })

  test('returns false when the value is the empty-string sentinel ""', () => {
    expect(hasSessionCookie('sb-abc123-auth-token=""')).toBe(false)
  })

  test("matches across mixed cookies (sb-*-auth-token alongside others)", () => {
    expect(hasSessionCookie("other=value; sb-abc123-auth-token=eyJ...; foo=bar")).toBe(true)
  })
})
