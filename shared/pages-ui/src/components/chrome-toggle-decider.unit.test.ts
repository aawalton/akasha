import { describe, expect, test } from "bun:test"
import { shouldToggleChrome } from "./chrome-toggle-decider"

describe("shouldToggleChrome — ambient-fact guards", () => {
  test("desktop never toggles (the toggle exists only below the bottom-nav breakpoint)", () => {
    expect(shouldToggleChrome({ target: null, hasTextSelection: false, isDesktop: true })).toBe(
      false
    )
  })

  test("an active text selection never toggles (drag-select must not toggle)", () => {
    expect(shouldToggleChrome({ target: null, hasTextSelection: true, isDesktop: false })).toBe(
      false
    )
  })

  test("mobile tap on a non-interactive surface (no target element) toggles", () => {
    expect(shouldToggleChrome({ target: null, hasTextSelection: false, isDesktop: false })).toBe(
      true
    )
  })

  test("desktop takes precedence over an otherwise-toggling tap", () => {
    expect(shouldToggleChrome({ target: null, hasTextSelection: false, isDesktop: true })).toBe(
      false
    )
  })
})
