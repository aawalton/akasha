import { describe, expect, test } from "bun:test"
import {
  DYNAMIC_DEFAULT_SENTINELS,
  isDynamicDefault,
  validateDynamicDefault,
} from "./dynamic-default"

describe("isDynamicDefault", () => {
  test("recognizes a well-formed $dynamic tagged object", () => {
    expect(isDynamicDefault({ $dynamic: "now" })).toBe(true)
    expect(isDynamicDefault({ $dynamic: "today" })).toBe(true)
    expect(isDynamicDefault({ $dynamic: "anything" })).toBe(true)
  })

  test("rejects literals and non-tagged objects", () => {
    expect(isDynamicDefault("now")).toBe(false)
    expect(isDynamicDefault(123)).toBe(false)
    expect(isDynamicDefault(true)).toBe(false)
    expect(isDynamicDefault(null)).toBe(false)
    expect(isDynamicDefault(undefined)).toBe(false)
    expect(isDynamicDefault([{ $dynamic: "now" }])).toBe(false)
    expect(isDynamicDefault({ value: "now" })).toBe(false)
  })
})

describe("validateDynamicDefault", () => {
  test("literal defaults are unconstrained (returns null) regardless of type", () => {
    expect(validateDynamicDefault("draft", "text")).toBeNull()
    expect(validateDynamicDefault(42, "number")).toBeNull()
    expect(validateDynamicDefault(true, "boolean")).toBeNull()
    expect(validateDynamicDefault(undefined, "instant")).toBeNull()
    expect(validateDynamicDefault({ nested: "object" }, "json")).toBeNull()
  })

  test("now on instant and today on calendar-date are valid", () => {
    expect(validateDynamicDefault({ $dynamic: "now" }, "instant")).toBeNull()
    expect(validateDynamicDefault({ $dynamic: "today" }, "calendar-date")).toBeNull()
  })

  test("now on a non-instant type is rejected", () => {
    const msg = validateDynamicDefault({ $dynamic: "now" }, "text")
    expect(msg).not.toBeNull()
    expect(msg).toContain("now")
    expect(msg).toContain("instant")
  })

  test("today on a non-calendar-date type is rejected", () => {
    const msg = validateDynamicDefault({ $dynamic: "today" }, "instant")
    expect(msg).not.toBeNull()
    expect(msg).toContain("today")
    expect(msg).toContain("calendar-date")
  })

  test("unknown sentinel name is rejected", () => {
    const msg = validateDynamicDefault({ $dynamic: "yesterday" }, "calendar-date")
    expect(msg).not.toBeNull()
    expect(msg).toContain("yesterday")
  })

  test("malformed $dynamic shapes are rejected", () => {
    expect(validateDynamicDefault({ $dynamic: 5 }, "instant")).not.toBeNull()
    expect(validateDynamicDefault({ $dynamic: "now", extra: 1 }, "instant")).not.toBeNull()
  })

  test("sentinel name is validated even when type is unknown (boundary without type)", () => {
    expect(validateDynamicDefault({ $dynamic: "now" }, undefined)).toBeNull()
    expect(validateDynamicDefault({ $dynamic: "today" }, undefined)).toBeNull()
    expect(validateDynamicDefault({ $dynamic: "bogus" }, undefined)).not.toBeNull()
  })

  test("the sentinel↔type map enumerates now and today", () => {
    expect(Object.keys(DYNAMIC_DEFAULT_SENTINELS).sort()).toEqual(["now", "today"])
    expect(DYNAMIC_DEFAULT_SENTINELS.now).toBe("instant")
    expect(DYNAMIC_DEFAULT_SENTINELS.today).toBe("calendar-date")
  })
})
