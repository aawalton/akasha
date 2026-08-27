import { describe, expect, test } from "bun:test"
import { isAuthFailure, SIGNED_OUT_MESSAGE } from "./auth-error"

describe("isAuthFailure", () => {
  test("401 is an auth failure", () => {
    expect(isAuthFailure(new Response(null, { status: 401 }))).toBe(true)
  })

  test("2xx is not an auth failure", () => {
    expect(isAuthFailure(new Response(null, { status: 200 }))).toBe(false)
  })

  test("other non-2xx (409 / 403 / 500) are not auth failures", () => {
    for (const status of [403, 409, 500]) {
      expect(isAuthFailure(new Response(null, { status }))).toBe(false)
    }
  })
})

describe("SIGNED_OUT_MESSAGE", () => {
  test("is non-empty and never suggests a retry", () => {
    expect(SIGNED_OUT_MESSAGE.length).toBeGreaterThan(0)
    expect(SIGNED_OUT_MESSAGE.toLowerCase()).not.toContain("try again")
  })
})
