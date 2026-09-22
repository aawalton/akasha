import type { Addressed } from "akasha/change/runner/properties/addressed.file-property.types.ts"
import type { RunnerReached } from "akasha/change/runner/properties/runner-reached.relation-property.types.ts"
import type { Module } from "akasha/code/module/module.page-type.types.ts"

export type ChangeRunner = Module & {
  addressed: Addressed
  reached: RunnerReached
}
