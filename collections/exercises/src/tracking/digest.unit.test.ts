import { describe, expect, test } from "bun:test"
import { mobilityTrend, progressionTarget } from "./digest-model"
import type { SetLine } from "./history-core"

function line(over: Partial<SetLine> = {}): SetLine {
  return { date: null, setNumber: null, reps: null, weight: null, rpe: null, ...over }
}

describe("progressionTarget", () => {
  test("beats the best set by one rep at the same load", () => {
    expect(progressionTarget(line({ weight: 30, reps: 16 }))).toBe("30 × 17 (beat best 30×16)")
  })

  test("treats null reps as zero", () => {
    expect(progressionTarget(line({ weight: 20, reps: null }))).toBe("20 × 1 (beat best 20×0)")
  })

  test("returns null when there is no best set or no weight", () => {
    expect(progressionTarget(null)).toBeNull()
    expect(progressionTarget(line({ weight: null, reps: 12 }))).toBeNull()
  })
})

describe("mobilityTrend", () => {
  test("rising series improves (higher is better)", () => {
    expect(mobilityTrend([45, 50, 55])).toBe("improving")
  })

  test("falling series declines", () => {
    expect(mobilityTrend([55, 50])).toBe("declining")
  })

  test("equal endpoints are flat", () => {
    expect(mobilityTrend([50, 60, 50])).toBe("flat")
  })

  test("fewer than two points is insufficient", () => {
    expect(mobilityTrend([50])).toBe("insufficient")
    expect(mobilityTrend([])).toBe("insufficient")
  })
})
