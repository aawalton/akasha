import { describe, expect, test } from "bun:test"
import { decideProgression, type ProgressionInput } from "./progression"
import type { SetLine } from "../tracking/history-core"

const DB_LADDER = [3, 5, 8, 10, 15, 20, 25, 30]

function s(weight: number | null, reps: number): SetLine {
  return { date: "2026-07-20", setNumber: null, reps, weight, rpe: null, isWarmup: false }
}

function input(over: Partial<ProgressionInput> = {}): ProgressionInput {
  return {
    lastSessionSets: [],
    repRangeLow: 8,
    repRangeHigh: 15,
    targetSets: 3,
    loadsLadder: DB_LADDER,
    ...over,
  }
}

describe("decideProgression", () => {
  test("no history → introduce at the range, load unpinned", () => {
    const d = decideProgression(input({ lastSessionSets: [] }))
    expect(d.action).toBe("introduce")
    expect(d.prescribedLoad).toBeNull()
    expect(d.prescribedRepLow).toBe(8)
    expect(d.prescribedRepHigh).toBe(15)
    expect(d.coarseJumpGuardFired).toBe(false)
  })

  test("a set below the range top → beat reps at the same load", () => {
    const d = decideProgression(input({ lastSessionSets: [s(20, 12), s(20, 11), s(20, 10)] }))
    expect(d.action).toBe("beat-reps")
    expect(d.prescribedLoad).toBe(20)
    expect(d.coarseJumpGuardFired).toBe(false)
    expect(d.rationale).toContain("12→13")
  })

  test("all sets at the range top with a reachable next increment → add load, reset reps", () => {
    const d = decideProgression(input({ lastSessionSets: [s(20, 15), s(20, 15), s(20, 15)] }))
    expect(d.action).toBe("increase-load")
    expect(d.prescribedLoad).toBe(25)
    expect(d.prescribedRepLow).toBe(8)
    expect(d.prescribedRepHigh).toBe(15)
    expect(d.coarseJumpGuardFired).toBe(false)
  })

  test("at the load ceiling (no heavier increment) → coarse-jump guard: hold load, extend reps + a set", () => {
    const d = decideProgression(input({ lastSessionSets: [s(30, 15), s(30, 15), s(30, 15)] }))
    expect(d.action).toBe("hold-extend-reps")
    expect(d.prescribedLoad).toBe(30)
    expect(d.prescribedRepLow).toBe(15)
    expect(d.prescribedRepHigh).toBe(17)
    expect(d.prescribedSets).toBe(4)
    expect(d.coarseJumpGuardFired).toBe(true)
    expect(d.rationale).toContain("ceiling")
  })

  test("a next increment too big to reach the range floor → coarse-jump guard holds the load", () => {
    const d = decideProgression(
      input({ lastSessionSets: [s(10, 15), s(10, 15)], loadsLadder: [10, 40] })
    )
    expect(d.action).toBe("hold-extend-reps")
    expect(d.prescribedLoad).toBe(10)
    expect(d.coarseJumpGuardFired).toBe(true)
  })

  test("bodyweight with no ladder → rep-only double progression", () => {
    const below = decideProgression(input({ lastSessionSets: [s(null, 10)], loadsLadder: [] }))
    expect(below.action).toBe("beat-reps")
    expect(below.prescribedLoad).toBeNull()

    const atTop = decideProgression(
      input({ lastSessionSets: [s(null, 15), s(null, 15)], loadsLadder: [] })
    )
    expect(atTop.action).toBe("hold-extend-reps")
    expect(atTop.prescribedLoad).toBeNull()
    expect(atTop.coarseJumpGuardFired).toBe(true)
    expect(atTop.rationale).toContain("Bodyweight")
  })

  test("generalizes progressionTarget: the modal working load anchors the decision", () => {
    const d = decideProgression(input({ lastSessionSets: [s(30, 8), s(25, 15), s(25, 15)] }))
    expect(d.action).toBe("increase-load")
    expect(d.prescribedLoad).toBe(30)
  })
})
