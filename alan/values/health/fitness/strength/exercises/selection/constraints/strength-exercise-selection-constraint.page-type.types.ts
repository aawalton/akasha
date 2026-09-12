import type { TestedAgainOn } from "akasha/alan/values/health/fitness/strength/exercises/selection/constraints/properties/tested-again-on.calendar-date-property.types.ts"
import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export type StrengthExerciseSelectionConstraint = Module & {
  testedAgainOn: TestedAgainOn
}
