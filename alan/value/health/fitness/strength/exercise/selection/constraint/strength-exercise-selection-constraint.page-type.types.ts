import type { TestedAgainOn } from "akasha/alan/value/health/fitness/strength/exercise/selection/constraint/properties/tested-again-on.calendar-date-property.types.ts"
import type { Module } from "akasha/code/module/module.page-type.types.ts"

export type StrengthExerciseSelectionConstraint = Module & {
  testedAgainOn: TestedAgainOn
}
