import { describe, expect, test } from "bun:test"
import { parseSupabaseCookieMatch } from "./cookie-match-core"

describe("parseSupabaseCookieMatch", () => {
  test("bare sb-<ref>-auth-token returns [undefined] (chunk 0)", () => {
    expect(parseSupabaseCookieMatch("sb-abcdefgh-auth-token")).toEqual([undefined])
  })

  test("sb-<ref>-auth-token.0 returns ['0']", () => {
    expect(parseSupabaseCookieMatch("sb-abcdefgh-auth-token.0")).toEqual(["0"])
  })

  test("sb-<ref>-auth-token.5 returns ['5']", () => {
    expect(parseSupabaseCookieMatch("sb-abcdefgh-auth-token.5")).toEqual(["5"])
  })

  test("sb-<ref>-auth-token.12 returns ['12']", () => {
    expect(parseSupabaseCookieMatch("sb-abcdefgh-auth-token.12")).toEqual(["12"])
  })

  test("non-supabase cookie key returns null", () => {
    expect(parseSupabaseCookieMatch("session-id")).toBeNull()
  })

  test("sb-<ref>-refresh-token (different cookie) returns null", () => {
    expect(parseSupabaseCookieMatch("sb-abcdefgh-refresh-token")).toBeNull()
  })

  test("sb-<ref>-auth-token. (trailing dot, no digit) returns null", () => {
    expect(parseSupabaseCookieMatch("sb-abcdefgh-auth-token.")).toBeNull()
  })

  test("sb-<ref>-auth-token.abc (non-numeric suffix) returns null", () => {
    expect(parseSupabaseCookieMatch("sb-abcdefgh-auth-token.abc")).toBeNull()
  })
})
