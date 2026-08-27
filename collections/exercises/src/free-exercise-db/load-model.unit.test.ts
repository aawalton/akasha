import { describe, expect, it } from "bun:test"
import { implementCountForExercise, loadFactorForExercise } from "./load-model"
import type { FreeExercise } from "./schemas"

function exercise(partial: Partial<FreeExercise> = {}): FreeExercise {
  const name = partial.name ?? "Some Exercise"
  return {
    id: partial.id ?? name.replace(/ /g, "_"),
    name,
    force: "pull",
    level: "beginner",
    mechanic: "isolation",
    equipment: "dumbbell",
    primaryMuscles: ["biceps"],
    secondaryMuscles: [],
    instructions: [],
    category: "strength",
    images: [],
    ...partial,
  }
}

describe("implementCountForExercise", () => {
  it("pins the regression rows that motivated the fix to 2", () => {
    expect(
      implementCountForExercise(
        exercise({ id: "Bent_Over_Two-Dumbbell_Row", name: "Bent Over Two-Dumbbell Row" })
      )
    ).toBe(2)
    expect(implementCountForExercise(exercise({ id: "Hammer_Curls", name: "Hammer Curls" }))).toBe(
      2
    )
  })

  it("defaults bilateral dumbbell movements to 2", () => {
    expect(implementCountForExercise(exercise({ name: "Dumbbell Bench Press" }))).toBe(2)
    expect(implementCountForExercise(exercise({ name: "Seated Dumbbell Press" }))).toBe(2)
    expect(implementCountForExercise(exercise({ name: "Dumbbell Flyes" }))).toBe(2)
  })

  it("downgrades single-arm / alternating dumbbell movements to 1", () => {
    expect(implementCountForExercise(exercise({ name: "One-Arm Dumbbell Row" }))).toBe(1)
    expect(implementCountForExercise(exercise({ name: "Alternate Hammer Curl" }))).toBe(1)
    expect(implementCountForExercise(exercise({ name: "Concentration Curls" }))).toBe(1)
    expect(implementCountForExercise(exercise({ name: "Single Dumbbell Raise" }))).toBe(1)
    expect(implementCountForExercise(exercise({ name: "Cross Body Hammer Curl" }))).toBe(1)
  })

  it("treats kettlebells as single-bell by default, upgrading only on a two-implement marker", () => {
    expect(
      implementCountForExercise(exercise({ name: "Kettlebell Thruster", equipment: "kettlebells" }))
    ).toBe(1)
    expect(
      implementCountForExercise(
        exercise({ name: "One-Arm Kettlebell Snatch", equipment: "kettlebells" })
      )
    ).toBe(1)
    expect(
      implementCountForExercise(
        exercise({ name: "Two-Arm Kettlebell Row", equipment: "kettlebells" })
      )
    ).toBe(2)
    expect(
      implementCountForExercise(
        exercise({ name: "Double Kettlebell Jerk", equipment: "kettlebells" })
      )
    ).toBe(2)
  })

  it("keeps an alternating-double kettlebell at 1 (per-rep one implement)", () => {
    expect(
      implementCountForExercise(
        exercise({ name: "Double Kettlebell Alternating Hang Clean", equipment: "kettlebells" })
      )
    ).toBe(1)
  })

  it("returns 1 for barbell / machine / cable / bodyweight movements", () => {
    expect(
      implementCountForExercise(exercise({ name: "Barbell Squat", equipment: "barbell" }))
    ).toBe(1)
    expect(implementCountForExercise(exercise({ name: "Leg Press", equipment: "machine" }))).toBe(1)
    expect(
      implementCountForExercise(exercise({ name: "Cable Crossover", equipment: "cable" }))
    ).toBe(1)
    expect(implementCountForExercise(exercise({ name: "Pushups", equipment: "body only" }))).toBe(1)
  })

  it("applies curated overrides for single-implement dumbbell edge cases", () => {
    expect(
      implementCountForExercise(
        exercise({ id: "Plie_Dumbbell_Squat", name: "Plie Dumbbell Squat" })
      )
    ).toBe(1)
    expect(
      implementCountForExercise(
        exercise({ id: "Calf_Raise_On_A_Dumbbell", name: "Calf Raise On A Dumbbell" })
      )
    ).toBe(1)
  })
})

describe("loadFactorForExercise", () => {
  it("pins the canonical pull / push anchors", () => {
    expect(loadFactorForExercise(exercise({ id: "Pullups", name: "Pullups" }))).toBe(1.0)
    expect(loadFactorForExercise(exercise({ id: "Pushups", name: "Pushups" }))).toBe(0.64)
  })

  it("defaults to 0 for weighted and unpinned movements", () => {
    expect(loadFactorForExercise(exercise({ name: "Dumbbell Bench Press" }))).toBe(0)
    expect(
      loadFactorForExercise(exercise({ id: "Plank", name: "Plank", equipment: "body only" }))
    ).toBe(0)
  })

  it("loads standing squat / lunge / step-up leg movements at the 0.6 bodyweight fraction", () => {
    expect(
      loadFactorForExercise(
        exercise({
          id: "Barbell_Squat",
          name: "Barbell Squat",
          equipment: "barbell",
          primaryMuscles: ["quadriceps"],
        })
      )
    ).toBe(0.6)
    expect(
      loadFactorForExercise(
        exercise({
          id: "Barbell_Lunge",
          name: "Barbell Lunge",
          equipment: "barbell",
          primaryMuscles: ["quadriceps"],
        })
      )
    ).toBe(0.6)
    expect(
      loadFactorForExercise(
        exercise({
          id: "Dumbbell_Step_Ups",
          name: "Dumbbell Step Ups",
          equipment: "dumbbell",
          primaryMuscles: ["quadriceps"],
        })
      )
    ).toBe(0.6)
  })

  it("loads hip-hinge movements (deadlift / RDL / good morning) at 0.6", () => {
    expect(
      loadFactorForExercise(
        exercise({
          id: "Barbell_Deadlift",
          name: "Barbell Deadlift",
          equipment: "barbell",
          primaryMuscles: ["lower back"],
        })
      )
    ).toBe(0.6)
    expect(
      loadFactorForExercise(
        exercise({
          id: "Romanian_Deadlift",
          name: "Romanian Deadlift",
          equipment: "barbell",
          primaryMuscles: ["hamstrings"],
        })
      )
    ).toBe(0.6)
    expect(
      loadFactorForExercise(
        exercise({
          id: "Stiff_Leg_Barbell_Good_Morning",
          name: "Stiff Leg Barbell Good Morning",
          equipment: "barbell",
          primaryMuscles: ["lower back"],
        })
      )
    ).toBe(0.6)
  })

  it("loads hip thrust / glute bridge movements at 0.5", () => {
    expect(
      loadFactorForExercise(
        exercise({
          id: "Barbell_Hip_Thrust",
          name: "Barbell Hip Thrust",
          equipment: "barbell",
          primaryMuscles: ["glutes"],
        })
      )
    ).toBe(0.5)
    expect(
      loadFactorForExercise(
        exercise({
          id: "Barbell_Glute_Bridge",
          name: "Barbell Glute Bridge",
          equipment: "barbell",
          primaryMuscles: ["glutes"],
        })
      )
    ).toBe(0.5)
  })

  it("keeps body-supported leg machines at 0 (external load already counted full)", () => {
    expect(
      loadFactorForExercise(
        exercise({
          id: "Leg_Press",
          name: "Leg Press",
          equipment: "machine",
          primaryMuscles: ["quadriceps"],
        })
      )
    ).toBe(0)
    expect(
      loadFactorForExercise(
        exercise({
          id: "Leg_Extensions",
          name: "Leg Extensions",
          equipment: "machine",
          primaryMuscles: ["quadriceps"],
        })
      )
    ).toBe(0)
    expect(
      loadFactorForExercise(
        exercise({
          id: "Lying_Leg_Curls",
          name: "Lying Leg Curls",
          equipment: "machine",
          primaryMuscles: ["hamstrings"],
        })
      )
    ).toBe(0)
    expect(
      loadFactorForExercise(
        exercise({
          id: "Lying_Machine_Squat",
          name: "Lying Machine Squat",
          equipment: "machine",
          primaryMuscles: ["quadriceps"],
        })
      )
    ).toBe(0)
  })

  it("does not load non-leg movements that happen to carry no marker", () => {
    expect(
      loadFactorForExercise(
        exercise({
          id: "Overhead_Squat_Press",
          name: "Overhead Squat Press",
          equipment: "barbell",
          primaryMuscles: ["shoulders"],
        })
      )
    ).toBe(0)
  })
})
