import { describe, expect, test } from "bun:test"
import { computePinned } from "./compute-pinned"

describe("computePinned", () => {
  test("pinned when exactly at the bottom", () => {
    expect(
      computePinned({ scrollHeight: 2000, scrollY: 1200, innerHeight: 800, threshold: 120 })
    ).toBe(true)
  })

  test("pinned within the threshold of the bottom", () => {
    expect(
      computePinned({ scrollHeight: 2000, scrollY: 1101, innerHeight: 800, threshold: 120 })
    ).toBe(true)
  })

  test("pinned exactly at the threshold boundary (inclusive)", () => {
    expect(
      computePinned({ scrollHeight: 2000, scrollY: 1080, innerHeight: 800, threshold: 120 })
    ).toBe(true)
  })

  test("unpinned past the threshold (scrolled up to read history)", () => {
    expect(
      computePinned({ scrollHeight: 2000, scrollY: 1000, innerHeight: 800, threshold: 120 })
    ).toBe(false)
  })

  test("pinned when content does not fill the viewport (nothing to scroll)", () => {
    expect(computePinned({ scrollHeight: 400, scrollY: 0, innerHeight: 800, threshold: 120 })).toBe(
      true
    )
  })
})
