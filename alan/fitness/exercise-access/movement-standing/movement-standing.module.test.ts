import { describe, expect, test } from "bun:test"
import { type Row, rowOf } from "../exercise-rows/exercise-rows.module.code.ts"
import { bestSet, lastWorkingSet } from "../set-history/set-history.module.code.ts"
import {
  datesBySession,
  linesIn,
  movementSlugsIn,
  sessionSlugsIn,
  setLineIn,
  titlesIn,
} from "./movement-standing.module.code.ts"

const LOGS: readonly Row[] = [
  rowOf({
    id: "1",
    slug: "s2-goblet-squat-set-2",
    sessionSlug: "s2",
    exerciseSlug: "goblet-squat",
    setNumber: 2,
    reps: 8,
    weight: 45,
    rpe: 8,
    isWarmup: false,
  }),
  rowOf({
    id: "2",
    slug: "s2-goblet-squat-set-1",
    sessionSlug: "s2",
    exerciseSlug: "goblet-squat",
    setNumber: 1,
    reps: 10,
    weight: 20,
    isWarmup: true,
  }),
  rowOf({
    id: "3",
    slug: "s1-goblet-squat-set-1",
    sessionSlug: "s1",
    exerciseSlug: "goblet-squat",
    setNumber: 1,
    reps: 10,
    weight: 40,
    isWarmup: false,
  }),
  rowOf({
    id: "4",
    slug: "s1-push-up-set-1",
    sessionSlug: "s1",
    exerciseSlug: "push-up",
    reps: 12,
  }),
]

const SESSIONS: readonly Row[] = [
  rowOf({ id: "a", slug: "s1", workoutSessionDate: "2026-06-19" }),
  rowOf({ id: "b", slug: "s2", workoutSessionDate: "2026-06-22" }),
]

describe("which movements stand and where", () => {
  test("the fixture holds four sets over two movements and two sessions", () => {
    expect(LOGS.length).toBe(4)
    expect(movementSlugsIn(LOGS).length).toBe(2)
    expect(sessionSlugsIn(LOGS).length).toBe(2)
  })

  test("a movement is named once and in the order its first set was met", () => {
    expect(movementSlugsIn(LOGS)).toEqual(["goblet-squat", "push-up"])
  })

  test("a set carries the day of the session it was logged in", () => {
    const lines = linesIn(LOGS, datesBySession(SESSIONS))
    expect(lines.map((one) => one.date)).toEqual([
      "2026-06-22",
      "2026-06-22",
      "2026-06-19",
      "2026-06-19",
    ])
  })

  test("a set whose session is not among those read carries no day rather than a wrong one", () => {
    const lines = linesIn(LOGS, new Map())
    expect(lines.every((one) => one.date === null)).toBe(true)
  })

  test("a set stating no load reads that load as absent rather than as zero", () => {
    const bare = LOGS[3]
    expect(bare).toBeDefined()
    const line = setLineIn(bare as Row, null)
    expect(line.weight).toBeNull()
    expect(line.rpe).toBeNull()
    expect(line.reps).toBe(12)
  })

  test("the best set is the heaviest across the sets rather than the latest", () => {
    const lines = linesIn(LOGS.slice(0, 3), datesBySession(SESSIONS))
    expect(bestSet(lines)?.weight).toBe(45)
  })

  test("the last working set skips the warmup standing before it", () => {
    const lines = linesIn(LOGS.slice(1, 3), datesBySession(SESSIONS))
    expect(lastWorkingSet(lines)?.weight).toBe(40)
  })

  test("a movement with no exercise page behind it keeps its slug for a name", () => {
    const titles = titlesIn([rowOf({ id: "e", slug: "goblet-squat", title: "Goblet Squat" })])
    expect(titles.get("goblet-squat")).toBe("Goblet Squat")
    expect(titles.get("push-up")).toBeUndefined()
  })

  test("an exercise page stating no title falls back to its own slug", () => {
    expect(titlesIn([rowOf({ id: "e", slug: "push-up" })]).get("push-up")).toBe("push-up")
  })
})
