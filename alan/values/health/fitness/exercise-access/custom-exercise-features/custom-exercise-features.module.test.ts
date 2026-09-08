import { expect, test } from "bun:test"
import { deriveCustomExerciseFeatures } from "./custom-exercise-features.module.code.ts"

test("a slug Alan states is read back to the spelling the working expects", () => {
  const traits = deriveCustomExerciseFeatures({
    title: "Sissy Squat",
    category: "strength",
    equipment: "body-only",
    primaryMuscles: ["quadriceps"],
  })
  expect(traits.movementPattern).toBe("squat")
  expect(traits.gripDemand).toBe("none")
})

test("a movement stating nothing but a title still takes every trait", () => {
  const traits = deriveCustomExerciseFeatures({ title: "Barbell Curl" })
  expect(traits.skillCost).toBe("low")
  expect(traits.laterality).toBe("bilateral")
  expect(traits.muscleFocus).toBe("other")
  expect(traits.movementPattern).toBe("isolation-other")
})

test("a movement Alan wrote takes its traits by the same working as an imported one", () => {
  const traits = deriveCustomExerciseFeatures({
    title: "Alternating Dumbbell Snatch",
    category: "olympic-weightlifting",
    equipment: "dumbbell",
  })
  expect(traits.isBallistic).toBe(true)
  expect(traits.skillCost).toBe("high")
  expect(traits.laterality).toBe("alternating")
})

test("a slug the vocabulary does not hold is carried through rather than refused", () => {
  const traits = deriveCustomExerciseFeatures({ title: "Odd Thing", category: "not-a-category" })
  expect(traits.movementPattern).toBe("isolation-other")
})
