import type { Addressed } from "akasha/changes/runners/properties/addressed.file-property.ts"
import type { Reached } from "akasha/changes/runners/properties/reached.relation-property.types.ts"
import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export type ChangeRunner = Module & {
  addressed: Addressed
  reached: Reached
}
