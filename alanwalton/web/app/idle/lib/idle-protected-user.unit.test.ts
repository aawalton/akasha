import { describe, expect, it } from "bun:test"
import { assertNotProtectedSaveUser, PROTECTED_SAVE_USER_ID } from "./idle-protected-user"

const THROWAWAY_DEV_USER_ID = "e62e5a30-9879-40dd-be89-27b17f89ddd5"

describe("assertNotProtectedSaveUser", () => {
  it("refuses Alan's protected canonical-save uid", () => {
    expect(() => assertNotProtectedSaveUser(PROTECTED_SAVE_USER_ID)).toThrow(/protected real user/)
  })

  it("allows the throwaway dev user uid", () => {
    expect(() => assertNotProtectedSaveUser(THROWAWAY_DEV_USER_ID)).not.toThrow()
  })

  it("allows any other (e.g. production) user uid", () => {
    expect(() => assertNotProtectedSaveUser("00000000-0000-4000-8000-000000000000")).not.toThrow()
  })
})
