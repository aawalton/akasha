import { describe, expect, it } from "bun:test"
import type { FreeExercise } from "./schemas"
import { deriveIsBallistic } from "./selection-features"

function exercise(partial: Partial<FreeExercise> = {}): FreeExercise {
  const name = partial.name ?? "Some Exercise"
  return {
    id: partial.id ?? name.replace(/ /g, "_"),
    name,
    force: "push",
    level: "intermediate",
    mechanic: "compound",
    equipment: "dumbbell",
    primaryMuscles: ["chest"],
    secondaryMuscles: [],
    instructions: [],
    category: "strength",
    images: [],
    ...partial,
  }
}

describe("deriveIsBallistic", () => {
  it("flags ballistic / power movements by name and by explosive category", () => {
    expect(deriveIsBallistic(exercise({ name: "One-Arm Kettlebell Swings" }))).toBe(true)
    expect(
      deriveIsBallistic(exercise({ name: "Power Clean", category: "olympic weightlifting" }))
    ).toBe(true)
    expect(deriveIsBallistic(exercise({ name: "Box Jump", category: "plyometrics" }))).toBe(true)
  })

  it("is false for grinding strength movements", () => {
    expect(deriveIsBallistic(exercise({ name: "Dumbbell Bench Press" }))).toBe(false)
    expect(deriveIsBallistic(exercise({ name: "Concentration Curls" }))).toBe(false)
  })
})

describe("deriveIsBallistic — running-in-place drills have flight", () => {
  it("marks the running-in-place and sprint drills ballistic", () => {
    expect(deriveIsBallistic(exercise({ name: "High Knees", category: "cardio" }))).toBe(true)
    expect(deriveIsBallistic(exercise({ name: "Wind Sprints", category: "strength" }))).toBe(true)
  })

  it("reaches a hand-added row, which has no dataset id to key an override on", () => {
    expect(deriveIsBallistic(exercise({ id: "", name: "High Knees", category: "cardio" }))).toBe(
      true
    )
  })

  it("leaves steady-state locomotion alone — it is the finisher's preferred stimulus", () => {
    for (const name of ["Trail Running/Walking", "Jogging, Treadmill", "Walking, Treadmill"]) {
      expect({
        name,
        ballistic: deriveIsBallistic(exercise({ name, category: "cardio" })),
      }).toEqual({ name, ballistic: false })
    }
  })
})
