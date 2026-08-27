import { describe, expect, test } from "bun:test"
import { OWNER_CALENDAR_ID } from "./env"
import { resolveCalendarId } from "./events"

describe("resolveCalendarId", () => {
  test("returns the explicit calendar id when present", () => {
    expect(resolveCalendarId("explicit-cal", "default-cal")).toBe("explicit-cal")
  })

  test("remaps the literal `primary` to the owner calendar", () => {
    expect(resolveCalendarId("primary", undefined)).toBe(OWNER_CALENDAR_ID)
  })

  test("remaps `primary` to the owner calendar even when an env default is set", () => {
    expect(resolveCalendarId("primary", "default-cal")).toBe(OWNER_CALENDAR_ID)
  })

  test("falls back to the env default when no explicit id", () => {
    expect(resolveCalendarId(undefined, "default-cal")).toBe("default-cal")
  })

  test("falls back to the owner calendar when neither explicit nor default is present", () => {
    expect(resolveCalendarId(undefined, undefined)).toBe(OWNER_CALENDAR_ID)
  })
})
