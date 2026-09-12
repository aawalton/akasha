import type { StrengthExercise } from "akasha/alan/values/health/fitness/strength/exercises/strength-exercise.page-type.types.ts"

type Read = Pick<StrengthExercise, "movementPattern" | "laterality">

export function leftIn(exercise: Read): boolean {
  return exercise.movementPattern !== "hinge" || exercise.laterality !== "bilateral"
}
