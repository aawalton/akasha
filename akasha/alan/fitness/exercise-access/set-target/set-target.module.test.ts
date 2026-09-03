import { describe, expect, test } from "bun:test"
import { bestSet, type SetLine } from "../set-history/set-history.module.code.ts"
import { targetPast, targetSaid } from "./set-target.module.code.ts"

function line(held: Partial<SetLine>): SetLine {
  return { date: null, setNumber: null, reps: null, weight: null, rpe: null, ...held }
}

describe("the set that beats the best one", () => {
  test("the target adds a repetition at the load the best set carried", () => {
    expect(targetPast(line({ weight: 40, reps: 10 }))).toEqual({
      weight: 40,
      reps: 11,
      beatWeight: 40,
      beatReps: 10,
    })
  })

  test("a best set counted at no repetitions is beaten at one", () => {
    expect(targetPast(line({ weight: 40 }))?.reps).toBe(1)
  })

  test("a best set carrying no load names no target", () => {
    expect(targetPast(line({ reps: 12 }))).toBeNull()
  })

  test("no best set names no target", () => {
    expect(targetPast(null)).toBeNull()
    expect(targetSaid(null)).toBeNull()
  })

  test("the target reads as the set to do and the set it beats", () => {
    expect(targetSaid(targetPast(line({ weight: 40, reps: 10 })))).toBe("40 × 11 (beat best 40×10)")
  })

  test("the target follows the best set the history states rather than the last one", () => {
    const lines: readonly SetLine[] = [
      line({ weight: 30, reps: 12 }),
      line({ weight: 45, reps: 6 }),
      line({ weight: 45, reps: 8 }),
    ]
    expect(targetSaid(targetPast(bestSet(lines)))).toBe("45 × 9 (beat best 45×8)")
  })
})
