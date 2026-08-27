import { describe, expect, test } from "bun:test"
import { parseSupabaseCookieOptions } from "./cookie-options"

describe("parseSupabaseCookieOptions", () => {
  test("returns undefined for unset env (string-or-undefined)", () => {
    expect(parseSupabaseCookieOptions(undefined)).toBeUndefined()
  })

  test("returns undefined for empty string", () => {
    expect(parseSupabaseCookieOptions("")).toBeUndefined()
  })

  test("returns { domain } for a non-empty value", () => {
    expect(parseSupabaseCookieOptions(".alanwalton.com")).toEqual({
      domain: ".alanwalton.com",
    })
  })

  test("returns { domain } verbatim, preserving leading dot", () => {
    expect(parseSupabaseCookieOptions(".tempereso.com")).toEqual({
      domain: ".tempereso.com",
    })
  })
})
