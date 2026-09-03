import { describe, expect, test } from "bun:test"
import { computeSessionVolume, setVolume, type VolumeSetInput } from "./set-volume.module.code.ts"

const NOTHING_STATED: VolumeSetInput = {
  reps: undefined,
  weight: undefined,
  isWarmup: undefined,
  activityType: undefined,
  loadFactor: undefined,
  implementCount: undefined,
}

function set(stated: Partial<VolumeSetInput>): VolumeSetInput {
  return { ...NOTHING_STATED, ...stated }
}

describe("what one set of work is worth", () => {
  test("is the weight moved once for each rep", () => {
    expect(setVolume(set({ reps: 10, weight: 20 }), 80)).toBe(200)
  })

  test("counts the weight once for each implement held", () => {
    expect(setVolume(set({ reps: 10, weight: 20, implementCount: 2 }), 80)).toBe(400)
  })

  test("counts one implement where the exercise states none", () => {
    expect(setVolume(set({ reps: 5, weight: 100 }), 80)).toBe(500)
  })

  test("counts the share of the bodyweight the exercise carries", () => {
    expect(setVolume(set({ reps: 10, weight: 0, loadFactor: 0.5 }), 80)).toBe(400)
  })

  test("adds the bodyweight share to the weight held", () => {
    expect(setVolume(set({ reps: 2, weight: 10, loadFactor: 1 }), 80)).toBe(180)
  })

  test("is nought for a warmup set", () => {
    expect(setVolume(set({ reps: 10, weight: 100, isWarmup: true }), 80)).toBe(0)
  })

  test("is nought for an activity other than strength", () => {
    expect(setVolume(set({ reps: 10, weight: 100, activityType: "cardio" }), 80)).toBe(0)
  })

  test("counts a set stating no activity as strength", () => {
    expect(setVolume(set({ reps: 10, weight: 100, activityType: undefined }), 80)).toBe(1000)
  })

  test("counts a set stating strength as strength", () => {
    expect(setVolume(set({ reps: 10, weight: 100, activityType: "strength" }), 80)).toBe(1000)
  })

  test("counts a set that is not a warmup as work", () => {
    expect(setVolume(set({ reps: 10, weight: 100, isWarmup: false }), 80)).toBe(1000)
  })

  test("is nought where no rep is stated", () => {
    expect(setVolume(set({ weight: 100 }), 80)).toBe(0)
  })

  test("counts no bodyweight where none is handed in", () => {
    expect(setVolume(set({ reps: 10, weight: 0, loadFactor: 1 }), undefined)).toBe(0)
  })

  test("is left unrounded", () => {
    expect(setVolume(set({ reps: 1, weight: 0, loadFactor: 0.5 }), 81)).toBe(40.5)
  })
})

describe("what a session's sets come to", () => {
  test("is nought for no set at all", () => {
    expect(computeSessionVolume([], 80)).toBe(0)
  })

  test("sums every set", () => {
    expect(
      computeSessionVolume([set({ reps: 10, weight: 20 }), set({ reps: 5, weight: 40 })], 80)
    ).toBe(400)
  })

  test("leaves the warmups out of the sum", () => {
    expect(
      computeSessionVolume(
        [set({ reps: 10, weight: 20 }), set({ reps: 10, weight: 100, isWarmup: true })],
        80
      )
    ).toBe(200)
  })

  test("rounds the sum", () => {
    expect(computeSessionVolume([set({ reps: 1, weight: 0, loadFactor: 0.5 })], 81)).toBe(41)
  })

  test("rounds the sum rather than each set", () => {
    const half = set({ reps: 1, weight: 0, loadFactor: 0.5 })
    expect(computeSessionVolume([half, half], 81)).toBe(81)
  })
})
