import type { StrengthExerciseImplement } from "akasha/alan/values/health/fitness/strength/exercises/implements/strength-exercise-implement.page-type.types.ts"

export const barbell = {
  id: "01a09414-2a72-74d4-82d8-2b2d85edb9ed",
  type: "strength-exercise-implement",
  slug: "barbell",
  definition: "a long bar held in both hands and loaded at each end",
} as const satisfies StrengthExerciseImplement
