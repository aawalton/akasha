import type { StrengthExerciseImplement } from "akasha/alan/values/health/fitness/strength/exercises/implements/strength-exercise-implement.page-type.types.ts"

export const cable = {
  id: "01a09414-57f0-7900-b485-9e337dc19be8",
  type: "strength-exercise-implement",
  slug: "cable",
  definition: "a stack of plates drawn through a pulley on a cable",
} as const satisfies StrengthExerciseImplement
