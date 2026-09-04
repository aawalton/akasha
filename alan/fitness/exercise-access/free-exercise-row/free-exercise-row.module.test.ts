import { expect, test } from "bun:test"
import { classificationOverrideFor, freeExerciseSchema } from "./free-exercise-row.module.code.ts"

test("a row naming no muscle, instruction or image reads as an empty list of each", () => {
  const row = freeExerciseSchema.parse({
    id: "Air_Bike",
    name: "Air Bike",
    force: "pull",
    level: "beginner",
    mechanic: "compound",
    equipment: "body only",
    category: "strength",
  })
  expect(row.primaryMuscles).toEqual([])
  expect(row.secondaryMuscles).toEqual([])
  expect(row.instructions).toEqual([])
  expect(row.images).toEqual([])
})

test("a row states its force and its mechanic as nothing rather than leaving them out", () => {
  const row = freeExerciseSchema.parse({
    id: "X",
    name: "X",
    force: null,
    level: "beginner",
    mechanic: null,
    equipment: null,
    category: "cardio",
  })
  expect(row.force).toBeNull()
  expect(row.mechanic).toBeNull()
})

test("the crossover reverse lunge is corrected and a row with no correction answers nothing", () => {
  expect(classificationOverrideFor("Crossover_Reverse_Lunge")?.category).toBe("strength")
  expect(classificationOverrideFor("Barbell_Squat")).toBeUndefined()
})

test("a correction is spelled as the upstream database spells a value", () => {
  expect(classificationOverrideFor("Crossover_Reverse_Lunge")?.equipment).toBe("body only")
})
