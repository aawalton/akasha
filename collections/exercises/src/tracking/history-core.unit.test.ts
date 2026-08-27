import { describe, expect, test } from "bun:test"
import { bestSet, lastWorkingSet, type SetLine } from "./history-core"

function line(over: Partial<SetLine> = {}): SetLine {
  return { date: null, setNumber: null, reps: null, weight: null, rpe: null, ...over }
}

describe("bestSet", () => {
  test("picks the heaviest weighted set", () => {
    const best = bestSet([line({ weight: 20, reps: 8 }), line({ weight: 30, reps: 5 })])
    expect(best?.weight).toBe(30)
  })

  test("breaks weight ties by max reps", () => {
    const best = bestSet([line({ weight: 30, reps: 8 }), line({ weight: 30, reps: 12 })])
    expect(best?.reps).toBe(12)
  })

  test("ignores sets with null weight", () => {
    const best = bestSet([line({ weight: null, reps: 30 }), line({ weight: 10, reps: 5 })])
    expect(best?.weight).toBe(10)
  })

  test("returns null when no weighted set exists", () => {
    expect(bestSet([line({ weight: null, reps: 12 })])).toBeNull()
    expect(bestSet([])).toBeNull()
  })
})

describe("lastWorkingSet", () => {
  test("returns the first non-warmup from a newest-first list", () => {
    const last = lastWorkingSet([
      line({ weight: 30, reps: 10, isWarmup: false }),
      line({ weight: 20, reps: 12, isWarmup: false }),
    ])
    expect(last?.weight).toBe(30)
  })

  test("skips leading warmups", () => {
    const last = lastWorkingSet([
      line({ weight: 10, reps: 10, isWarmup: true }),
      line({ weight: 30, reps: 8, isWarmup: false }),
    ])
    expect(last?.weight).toBe(30)
  })

  test("treats absent isWarmup as a working set", () => {
    const last = lastWorkingSet([line({ weight: 25, reps: 6 })])
    expect(last?.weight).toBe(25)
  })

  test("returns null when every set is a warmup or the list is empty", () => {
    expect(lastWorkingSet([line({ weight: 10, isWarmup: true })])).toBeNull()
    expect(lastWorkingSet([])).toBeNull()
  })
})
