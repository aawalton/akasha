import { describe, expect, test } from "bun:test"
import { computeReadProgress } from "./read-progress"

describe("computeReadProgress", () => {
  test("wordCount <= 0 → undefined", () => {
    expect(
      computeReadProgress({ scrollFraction: 0.5, wordCount: 0, currentProgress: undefined })
    ).toBeUndefined()
    expect(
      computeReadProgress({ scrollFraction: 0.5, wordCount: -10, currentProgress: undefined })
    ).toBeUndefined()
  })

  test("non-finite wordCount → undefined", () => {
    expect(
      computeReadProgress({
        scrollFraction: 0.5,
        wordCount: Number.NaN,
        currentProgress: undefined,
      })
    ).toBeUndefined()
    expect(
      computeReadProgress({
        scrollFraction: 0.5,
        wordCount: Number.POSITIVE_INFINITY,
        currentProgress: undefined,
      })
    ).toBeUndefined()
  })

  test("top of page (frac 0) with no current progress → undefined", () => {
    expect(
      computeReadProgress({ scrollFraction: 0, wordCount: 100, currentProgress: undefined })
    ).toBeUndefined()
  })

  test("mid (frac 0.5, wordCount 100, no current) → 50", () => {
    expect(
      computeReadProgress({ scrollFraction: 0.5, wordCount: 100, currentProgress: undefined })
    ).toBe(50)
  })

  test("near-end (frac 0.99, wordCount 1000) → 990 (no snap to full, #15380)", () => {
    expect(
      computeReadProgress({ scrollFraction: 0.99, wordCount: 1000, currentProgress: undefined })
    ).toBe(990)
  })

  test("monotonic: current 80, frac 0.5 wordCount 100 (=50) → undefined (no decrease)", () => {
    expect(
      computeReadProgress({ scrollFraction: 0.5, wordCount: 100, currentProgress: 80 })
    ).toBeUndefined()
  })

  test("advance: current 40, frac 0.6 wordCount 100 (=60) → 60", () => {
    expect(computeReadProgress({ scrollFraction: 0.6, wordCount: 100, currentProgress: 40 })).toBe(
      60
    )
  })

  test("clamp at wordCount (frac 1, wordCount 100) → 100", () => {
    expect(
      computeReadProgress({ scrollFraction: 1, wordCount: 100, currentProgress: undefined })
    ).toBe(100)
  })

  test("frac > 1 clamped to 1 → wordCount", () => {
    expect(
      computeReadProgress({ scrollFraction: 2.5, wordCount: 100, currentProgress: undefined })
    ).toBe(100)
  })
})
