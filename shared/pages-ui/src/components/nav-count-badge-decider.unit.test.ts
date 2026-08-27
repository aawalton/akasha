import { describe, expect, test } from "bun:test"
import { parseShowCountBadge, shouldShowCountBadge } from "./nav-count-badge-decider"

describe("parseShowCountBadge", () => {
  test("true opts the nav into the badge", () => {
    expect(parseShowCountBadge(true)).toBe(true)
  })

  test("false / null / undefined leave it off", () => {
    expect(parseShowCountBadge(false)).toBe(false)
    expect(parseShowCountBadge(null)).toBe(false)
    expect(parseShowCountBadge(undefined)).toBe(false)
  })

  test("throws on a non-boolean value (boundary parse, no silent fallback)", () => {
    expect(() => parseShowCountBadge("true")).toThrow()
    expect(() => parseShowCountBadge(1)).toThrow()
  })
})

describe("shouldShowCountBadge", () => {
  test("renders only for a positive count", () => {
    expect(shouldShowCountBadge(1)).toBe(true)
    expect(shouldShowCountBadge(42)).toBe(true)
  })

  test("never renders zero or a not-yet-loaded count", () => {
    expect(shouldShowCountBadge(0)).toBe(false)
    expect(shouldShowCountBadge(null)).toBe(false)
  })

  test("suppresses a negative count (defensive)", () => {
    expect(shouldShowCountBadge(-1)).toBe(false)
  })
})
