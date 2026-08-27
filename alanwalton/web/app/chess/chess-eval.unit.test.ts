import { describe, expect, test } from "bun:test"
import { evalToWhiteFraction, formatScore } from "./chess-eval"

describe("evalToWhiteFraction", () => {
  test("an even position is a half-full bar", () => {
    expect(evalToWhiteFraction(0, "cp")).toBeCloseTo(0.5, 5)
  })

  test("a large white advantage nearly fills the bar for white", () => {
    expect(evalToWhiteFraction(1000, "cp")).toBeGreaterThan(0.9)
  })

  test("a large black advantage nearly empties the bar (black filled)", () => {
    expect(evalToWhiteFraction(-1000, "cp")).toBeLessThan(0.1)
  })

  test("the fraction is monotonic in the white-POV score", () => {
    expect(evalToWhiteFraction(100, "cp")).toBeGreaterThan(evalToWhiteFraction(0, "cp"))
    expect(evalToWhiteFraction(0, "cp")).toBeGreaterThan(evalToWhiteFraction(-100, "cp"))
  })

  test("the fraction is always a valid bar proportion in [0, 1]", () => {
    for (const cp of [-100000, -1000, -1, 0, 1, 1000, 100000]) {
      const f = evalToWhiteFraction(cp, "cp")
      expect(f).toBeGreaterThanOrEqual(0)
      expect(f).toBeLessThanOrEqual(1)
    }
  })

  test("a forced mate pins the bar fully to the mating side", () => {
    expect(evalToWhiteFraction(3, "mate")).toBe(1)
    expect(evalToWhiteFraction(-2, "mate")).toBe(0)
  })
})

describe("formatScore", () => {
  test("a centipawn score renders as signed pawns", () => {
    expect(formatScore(150, "cp")).toBe("+1.50")
    expect(formatScore(-75, "cp")).toBe("-0.75")
    expect(formatScore(0, "cp")).toBe("0.00")
  })

  test("a mate score renders as #N", () => {
    expect(formatScore(3, "mate")).toBe("#3")
  })
})
