import type { StrengthExerciseImplement } from "akasha/alan/value/health/fitness/strength/exercise/implement/strength-exercise-implement.page-type.types.ts"

export const bodyOnly = {
  id: "01a09414-4186-7f52-b556-3128dc12122d",
  type: "strength-exercise-implement",
  slug: "body-only",
  definition: "the weight of Alan's own body and nothing besides",
} as const satisfies StrengthExerciseImplement
