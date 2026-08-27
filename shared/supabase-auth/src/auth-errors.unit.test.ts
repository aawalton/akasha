import { describe, expect, it } from "bun:test"
import { isInvalidCredentialsError } from "./auth"

describe("isInvalidCredentialsError", () => {
  it("detects the stable GoTrue invalid_credentials code", () => {
    expect(isInvalidCredentialsError({ code: "invalid_credentials", message: "whatever" })).toBe(
      true
    )
  })

  it("detects the message text when no code is present", () => {
    expect(isInvalidCredentialsError(new Error("Invalid login credentials"))).toBe(true)
    expect(isInvalidCredentialsError("Invalid login credentials")).toBe(true)
    expect(isInvalidCredentialsError(new Error("AuthApiError: invalid credentials"))).toBe(true)
  })

  it("is false for unrelated errors and non-error inputs", () => {
    expect(isInvalidCredentialsError(new Error("network timeout"))).toBe(false)
    expect(isInvalidCredentialsError({ code: "over_email_send_rate_limit" })).toBe(false)
    expect(isInvalidCredentialsError(null)).toBe(false)
    expect(isInvalidCredentialsError(undefined)).toBe(false)
    expect(isInvalidCredentialsError(42)).toBe(false)
  })
})
