import type { Module } from "../../code-system/modules/module.page-type.ts"
import type { Addressed } from "./properties/addressed.file-property.ts"
import type { Reached } from "./properties/reached.relation-property.ts"

export type ChangeRunner = Module & {
  addressed: Addressed
  reached: Reached
}
