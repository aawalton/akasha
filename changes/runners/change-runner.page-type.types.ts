import type { Module } from "../../code-system/modules/module.page-type.types.ts"
import type { Addressed } from "./properties/addressed.file-property.ts"
import type { Reached } from "./properties/reached.relation-property.types.ts"

export type ChangeRunner = Module & {
  addressed: Addressed
  reached: Reached
}
