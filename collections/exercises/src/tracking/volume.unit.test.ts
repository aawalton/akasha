import { describe, expect, test } from "bun:test"
import { loadFactorForExercise } from "../free-exercise-db/load-model"
import type { FreeExercise } from "../free-exercise-db/schemas"
import { computeSessionVolume, setVolume, type VolumeSetInput } from "./volume"

function strengthSet(over: Partial<VolumeSetInput> = {}): VolumeSetInput {
  return {
    reps: undefined,
    weight: undefined,
    isWarmup: undefined,
    activityType: undefined,
    loadFactor: undefined,
    implementCount: undefined,
    ...over,
  }
}

describe("setVolume", () => {
  test("two-dumbbell row: weight 30, implementCount 2, reps 10 → 600", () => {
    expect(
      setVolume(strengthSet({ weight: 30, implementCount: 2, reps: 10, loadFactor: 0 }), undefined)
    ).toBe(600)
  })

  test("bodyweight push-up: loadFactor 0.64, reps 20, bodyweight 180 → 2304", () => {
    expect(setVolume(strengthSet({ weight: undefined, loadFactor: 0.64, reps: 20 }), 180)).toBe(
      2304
    )
  })

  test("warmup set contributes 0", () => {
    expect(setVolume(strengthSet({ weight: 100, reps: 5, isWarmup: true }), undefined)).toBe(0)
  })

  test("cardio activity contributes 0", () => {
    expect(setVolume(strengthSet({ weight: 0, reps: 0, activityType: "cardio" }), 180)).toBe(0)
  })

  test("single-dumbbell default (implementCount undefined → 1): weight 25, reps 8 → 200", () => {
    expect(setVolume(strengthSet({ weight: 25, reps: 8 }), undefined)).toBe(200)
  })

  test("bodyweight undefined treats the bodyweight term as 0", () => {
    expect(setVolume(strengthSet({ loadFactor: 0.5, reps: 10 }), undefined)).toBe(0)
  })
})

describe("computeSessionVolume", () => {
  test("sums a mixed list (strength + warmup + cardio + bodyweight)", () => {
    const sets: readonly VolumeSetInput[] = [
      strengthSet({ weight: 30, implementCount: 2, reps: 10 }),
      strengthSet({ weight: 100, reps: 5, isWarmup: true }),
      strengthSet({ weight: 0, reps: 0, activityType: "cardio" }),
      strengthSet({ weight: undefined, loadFactor: 0.64, reps: 20 }),
      strengthSet({ weight: 25, reps: 8 }),
    ]
    expect(computeSessionVolume(sets, 180)).toBe(3104)
  })

  test("empty list is 0", () => {
    expect(computeSessionVolume([], 180)).toBe(0)
  })
})

describe("ranking coherence: a hard loaded leg session outscores an easy bodyweight snack", () => {
  function legExercise(id: string, name: string, muscles: readonly string[]): FreeExercise {
    return {
      id,
      name,
      force: "push",
      level: "intermediate",
      mechanic: "compound",
      equipment: "barbell",
      primaryMuscles: [...muscles],
      secondaryMuscles: [],
      instructions: [],
      category: "strength",
      images: [],
    }
  }

  const BODYWEIGHT = 180
  const squat = legExercise("Barbell_Squat", "Barbell Squat", ["quadriceps"])
  const deadlift = legExercise("Barbell_Deadlift", "Barbell Deadlift", ["lower back"])

  const hardLoadedSession: readonly VolumeSetInput[] = [
    {
      reps: 5,
      weight: 185,
      isWarmup: false,
      activityType: "strength",
      implementCount: 1,
      loadFactor: loadFactorForExercise(squat),
    },
    {
      reps: 5,
      weight: 185,
      isWarmup: false,
      activityType: "strength",
      implementCount: 1,
      loadFactor: loadFactorForExercise(squat),
    },
    {
      reps: 5,
      weight: 185,
      isWarmup: false,
      activityType: "strength",
      implementCount: 1,
      loadFactor: loadFactorForExercise(squat),
    },
    {
      reps: 5,
      weight: 225,
      isWarmup: false,
      activityType: "strength",
      implementCount: 1,
      loadFactor: loadFactorForExercise(deadlift),
    },
    {
      reps: 5,
      weight: 225,
      isWarmup: false,
      activityType: "strength",
      implementCount: 1,
      loadFactor: loadFactorForExercise(deadlift),
    },
  ]

  const easyBodyweightSnack: readonly VolumeSetInput[] = [
    {
      reps: 50,
      weight: undefined,
      isWarmup: false,
      activityType: "strength",
      implementCount: 1,
      loadFactor: 0.6,
    },
  ]

  test("the loaded session scores higher than the snack", () => {
    const loaded = computeSessionVolume(hardLoadedSession, BODYWEIGHT)
    const snack = computeSessionVolume(easyBodyweightSnack, BODYWEIGHT)
    expect(loaded).toBeGreaterThan(snack)
  })
})
