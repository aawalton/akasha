import { describe, expect, it } from "bun:test"
import { assertCredentialPathAllowed } from "./protected-user"
import { USER_ID } from "./user-id"

const OTHER_UID = "00000000-0000-4000-8000-000000000000"

describe("assertCredentialPathAllowed", () => {
  it("allows a non-protected (throwaway) uid with no flags", () => {
    expect(() => assertCredentialPathAllowed({ resolvedUserId: OTHER_UID })).not.toThrow()
  })

  it("allows a non-protected uid even with opt-in / read-only flags set", () => {
    expect(() =>
      assertCredentialPathAllowed({
        resolvedUserId: OTHER_UID,
        deliberateRealUserOptIn: true,
        readOnly: true,
      })
    ).not.toThrow()
  })

  it("blocks the protected uid with no flags (accidental real-user use)", () => {
    expect(() => assertCredentialPathAllowed({ resolvedUserId: USER_ID })).toThrow()
  })

  it("blocks the protected uid with deliberate opt-in but writable (readOnly unset/false)", () => {
    expect(() =>
      assertCredentialPathAllowed({ resolvedUserId: USER_ID, deliberateRealUserOptIn: true })
    ).toThrow()
    expect(() =>
      assertCredentialPathAllowed({
        resolvedUserId: USER_ID,
        deliberateRealUserOptIn: true,
        readOnly: false,
      })
    ).toThrow()
  })

  it("blocks the protected uid with readOnly but no deliberate opt-in", () => {
    expect(() => assertCredentialPathAllowed({ resolvedUserId: USER_ID, readOnly: true })).toThrow()
  })

  it("permits the protected uid only with deliberate read-only opt-in", () => {
    expect(() =>
      assertCredentialPathAllowed({
        resolvedUserId: USER_ID,
        deliberateRealUserOptIn: true,
        readOnly: true,
      })
    ).not.toThrow()
  })
})
