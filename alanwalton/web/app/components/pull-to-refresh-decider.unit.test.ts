import { describe, expect, test } from "bun:test"
import { shouldArm } from "./pull-to-refresh-decider"

describe("shouldArm", () => {
  test("arms when the window is at top and there are no scrollable ancestors", () => {
    expect(shouldArm([], 0)).toBe(true)
  })

  test("arms when window and every scrollable ancestor are at scrollTop 0 (legitimate at-top pull)", () => {
    expect(shouldArm([{ scrollTop: 0 }, { scrollTop: 0 }], 0)).toBe(true)
  })

  test("does NOT arm when the window has scrolled off the top", () => {
    expect(shouldArm([], 40)).toBe(false)
  })

  test("does NOT arm when a scrollable ancestor is scrolled down — the #15690 inner-scroller false-fire", () => {
    expect(shouldArm([{ scrollTop: 250 }], 0)).toBe(false)
  })

  test("does NOT arm when any ancestor in a deep chain is scrolled, even if others are at top", () => {
    expect(shouldArm([{ scrollTop: 0 }, { scrollTop: 120 }, { scrollTop: 0 }], 0)).toBe(false)
  })

  test("treats a negative (over-scroll rubber-band) scrollTop as at-top", () => {
    expect(shouldArm([{ scrollTop: -8 }], -2)).toBe(true)
  })
})
