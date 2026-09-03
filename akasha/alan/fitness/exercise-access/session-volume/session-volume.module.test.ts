import { describe, expect, test } from "bun:test"
import { type Row, rowOf } from "../exercise-rows/exercise-rows.module.code.ts"
import { computeSessionVolume } from "../set-volume/set-volume.module.code.ts"
import { exerciseSlugsIn, loadsIn, volumeSetsIn } from "./session-volume.module.code.ts"

const SET_LOGS: readonly Row[] = [
  rowOf({
    id: "a",
    slug: "a",
    exerciseSlug: "goblet-squat",
    reps: 10,
    weight: 40,
    isWarmup: false,
  }),
  rowOf({ id: "b", slug: "b", exerciseSlug: "goblet-squat", reps: 5, weight: 20, isWarmup: true }),
  rowOf({ id: "c", slug: "c", exerciseSlug: "push-up", reps: 12, isWarmup: false }),
  rowOf({ id: "d", slug: "d", exerciseSlug: "bike", isWarmup: false, activityType: "cardio" }),
]

const EXERCISES: readonly Row[] = [
  rowOf({ id: "e1", slug: "goblet-squat", loadFactor: 0, implementCount: 1 }),
  rowOf({ id: "e2", slug: "push-up", loadFactor: 0.65 }),
]

describe("what a session's sets come to", () => {
  test("the fixture holds four sets over three movements, so an empty one cannot read clean", () => {
    expect(SET_LOGS.length).toBe(4)
    expect(exerciseSlugsIn(SET_LOGS).length).toBe(3)
  })

  test("a movement is named once however many of its sets stand", () => {
    expect(exerciseSlugsIn(SET_LOGS)).toEqual(["goblet-squat", "push-up", "bike"])
  })

  test("a set whose movement states no load reads that load as absent rather than as zero", () => {
    const loads = loadsIn(EXERCISES)
    expect(loads.get("push-up")?.implementCount).toBeUndefined()
    expect(loads.get("push-up")?.loadFactor).toBe(0.65)
  })

  test("a movement no exercise page stands for leaves its load absent", () => {
    const sets = volumeSetsIn(SET_LOGS, loadsIn(EXERCISES))
    const bike = sets[3]
    expect(bike).toBeDefined()
    expect(bike?.loadFactor).toBeUndefined()
    expect(bike?.activityType).toBe("cardio")
  })

  test("a warmup and a cardio set carry no strength volume, and a bodyweight set carries the body", () => {
    const sets = volumeSetsIn(SET_LOGS, loadsIn(EXERCISES))
    expect(computeSessionVolume(sets, 200)).toBe(40 * 10 + 0.65 * 200 * 12)
  })

  test("a heavier lifter counts more volume for the same bodyweight movement", () => {
    const sets = volumeSetsIn(SET_LOGS, loadsIn(EXERCISES))
    expect(computeSessionVolume(sets, 220)).toBeGreaterThan(computeSessionVolume(sets, 200))
  })
})
