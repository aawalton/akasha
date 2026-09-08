import { describe, expect, test } from "bun:test"
import { bestSet, lastWorkingSet, type SetLine } from "./set-history.module.code.ts"

function line(stated: Partial<SetLine>): SetLine {
  return { date: null, setNumber: null, reps: null, weight: null, rpe: null, ...stated }
}

describe("the best set among a movement's lines", () => {
  test("is nothing where there is no line", () => {
    expect(bestSet([])).toBeNull()
  })

  test("is nothing where no line states a weight", () => {
    expect(bestSet([line({ reps: 10 }), line({ reps: 8 })])).toBeNull()
  })

  test("is the heaviest", () => {
    const heavy = line({ weight: 100, reps: 3 })
    expect(bestSet([line({ weight: 60, reps: 10 }), heavy, line({ weight: 80, reps: 5 })])).toBe(
      heavy
    )
  })

  test("passes over a line stating no weight", () => {
    const only = line({ weight: 40, reps: 6 })
    expect(bestSet([line({ reps: 20 }), only])).toBe(only)
  })

  test("breaks a tie on weight by reps", () => {
    const more = line({ weight: 100, reps: 6 })
    expect(bestSet([line({ weight: 100, reps: 4 }), more])).toBe(more)
  })

  test("keeps the earlier line where a tie is broken by neither", () => {
    const first = line({ weight: 100, reps: 4, setNumber: 1 })
    expect(bestSet([first, line({ weight: 100, reps: 4, setNumber: 2 })])).toBe(first)
  })

  test("counts a line stating no reps as nought reps in a tie", () => {
    const withReps = line({ weight: 100, reps: 1 })
    expect(bestSet([line({ weight: 100 }), withReps])).toBe(withReps)
  })

  test("takes a warmup as the best where it is the heaviest", () => {
    const warmup = line({ weight: 200, reps: 1, isWarmup: true })
    expect(bestSet([line({ weight: 100, reps: 5 }), warmup])).toBe(warmup)
  })
})

describe("the last working set among a movement's lines", () => {
  test("is nothing where there is no line", () => {
    expect(lastWorkingSet([])).toBeNull()
  })

  test("is the first line, the lines running newest first", () => {
    const newest = line({ weight: 100, reps: 5 })
    expect(lastWorkingSet([newest, line({ weight: 90, reps: 5 })])).toBe(newest)
  })

  test("passes over the warmups at the front", () => {
    const working = line({ weight: 100, reps: 5 })
    expect(lastWorkingSet([line({ weight: 40, reps: 10, isWarmup: true }), working])).toBe(working)
  })

  test("is nothing where every line is a warmup", () => {
    expect(lastWorkingSet([line({ weight: 40, isWarmup: true })])).toBeNull()
  })

  test("takes a line stating nothing about warmup as work", () => {
    const stated = line({ weight: 100 })
    expect(lastWorkingSet([stated])).toBe(stated)
  })

  test("takes a line stating it is no warmup as work", () => {
    const stated = line({ weight: 100, isWarmup: false })
    expect(lastWorkingSet([stated])).toBe(stated)
  })
})
