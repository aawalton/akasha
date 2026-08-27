import { describe, expect, it } from "bun:test"
import type { FreeExercise } from "./schemas"
import { deriveLaterality } from "./selection-features"

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

describe("deriveLaterality", () => {
  it("reads one-side markers as unilateral, excluding the bilateral goblet hold", () => {
    expect(deriveLaterality(exercise({ name: "One-Arm Kettlebell Swings" }))).toBe("unilateral")
    expect(deriveLaterality(exercise({ name: "Concentration Curls" }))).toBe("unilateral")
    expect(deriveLaterality(exercise({ name: "Bulgarian Split Squat" }))).toBe("unilateral")
    expect(deriveLaterality(exercise({ name: "Goblet Squat" }))).toBe("bilateral")
  })

  it("reads alternating and see-saw markers as alternating", () => {
    expect(deriveLaterality(exercise({ name: "Alternate Hammer Curl" }))).toBe("alternating")
    expect(deriveLaterality(exercise({ name: "Seesaw Press" }))).toBe("alternating")
  })

  it("reads the one-side carry markers as unilateral", () => {
    expect(deriveLaterality(exercise({ name: "Suitcase Carry" }))).toBe("unilateral")
    expect(deriveLaterality(exercise({ name: "Kettlebell Suitcase Carry" }))).toBe("unilateral")
    expect(deriveLaterality(exercise({ name: "Waiter Walk" }))).toBe("unilateral")
    expect(deriveLaterality(exercise({ name: "Farmer's Carry" }))).toBe("bilateral")
  })

  it("defaults bilateral movements to bilateral", () => {
    expect(deriveLaterality(exercise({ name: "Barbell Squat" }))).toBe("bilateral")
    expect(deriveLaterality(exercise({ name: "Dumbbell Bench Press" }))).toBe("bilateral")
  })
})

describe("deriveLaterality — the lunge family is single-leg", () => {
  const LUNGES = [
    "Dumbbell Rear Lunge",
    "Bodyweight Reverse Lunge",
    "Crossover Reverse Lunge",
    "Dumbbell Lunges",
    "Goblet Reverse Lunge",
    "Lunge Pass Through",
    "Barbell Walking Lunge",
    "Elevated Back Lunge",
    "Kettlebell Turkish Get-Up (Lunge style)",
  ]

  it("reads every lunge as unilateral, not just the ones named split squat", () => {
    for (const name of LUNGES) {
      expect({ name, laterality: deriveLaterality(exercise({ name })) }).toEqual({
        name,
        laterality: "unilateral",
      })
    }
  })

  it("reads step-ups as unilateral — one leg raises the body", () => {
    expect(deriveLaterality(exercise({ name: "Step-up with Knee Raise" }))).toBe("unilateral")
    expect(deriveLaterality(exercise({ name: "Dumbbell Step Ups" }))).toBe("unilateral")
  })

  it("still lets an explicit alternating marker win over the lunge marker", () => {
    expect(deriveLaterality(exercise({ name: "Alternating Lunge" }))).toBe("alternating")
  })

  it("does not sweep in bilateral movements that merely share a word", () => {
    expect(deriveLaterality(exercise({ name: "Step Mill" }))).toBe("bilateral")
    expect(deriveLaterality(exercise({ name: "Barbell Squat" }))).toBe("bilateral")
  })
})
