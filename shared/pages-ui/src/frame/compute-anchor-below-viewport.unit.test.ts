import { describe, expect, test } from "bun:test"
import { computeAnchorBelowViewport } from "./compute-anchor-below-viewport"

describe("computeAnchorBelowViewport", () => {
  test("below the fold → out of view (show jump)", () => {
    expect(computeAnchorBelowViewport({ anchorTop: 900, innerHeight: 800, threshold: 120 })).toBe(
      true
    )
  })

  test("just landed at the top → in view (hide)", () => {
    expect(computeAnchorBelowViewport({ anchorTop: 48, innerHeight: 800, threshold: 120 })).toBe(
      false
    )
  })

  test("scrolled down into the newest turn (anchor above viewport) → in view (hide)", () => {
    expect(computeAnchorBelowViewport({ anchorTop: -400, innerHeight: 800, threshold: 120 })).toBe(
      false
    )
  })

  test("at the threshold boundary is not yet out of view (strict, hide)", () => {
    expect(computeAnchorBelowViewport({ anchorTop: 680, innerHeight: 800, threshold: 120 })).toBe(
      false
    )
  })

  test("one px past the boundary → out of view (show)", () => {
    expect(computeAnchorBelowViewport({ anchorTop: 681, innerHeight: 800, threshold: 120 })).toBe(
      true
    )
  })
})
