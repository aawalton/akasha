import { describe, expect, test } from "bun:test"
import { isEffectivelyAuthenticated } from "./effective-auth"

describe("isEffectivelyAuthenticated (opt-in ON)", () => {
  const on = { signInOnInvalidSession: true }

  test("cookie present but refresh failed → NOT authenticated (loud redirect downstream)", () => {
    expect(isEffectivelyAuthenticated({ ...on, hadSessionCookie: true, sessionValid: false })).toBe(
      false
    )
  })

  test("refresh produced a valid session → authenticated", () => {
    expect(isEffectivelyAuthenticated({ ...on, hadSessionCookie: true, sessionValid: true })).toBe(
      true
    )
  })

  test("no cookie and no session → not authenticated", () => {
    expect(
      isEffectivelyAuthenticated({ ...on, hadSessionCookie: false, sessionValid: false })
    ).toBe(false)
  })
})

describe("isEffectivelyAuthenticated (opt-in OFF — default, unchanged behavior)", () => {
  const off = { signInOnInvalidSession: false }

  test("cookie present → authenticated regardless of session validity", () => {
    expect(
      isEffectivelyAuthenticated({ ...off, hadSessionCookie: true, sessionValid: false })
    ).toBe(true)
    expect(isEffectivelyAuthenticated({ ...off, hadSessionCookie: true, sessionValid: true })).toBe(
      true
    )
  })

  test("no cookie → not authenticated", () => {
    expect(
      isEffectivelyAuthenticated({ ...off, hadSessionCookie: false, sessionValid: true })
    ).toBe(false)
  })
})
