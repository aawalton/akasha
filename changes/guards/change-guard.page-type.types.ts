import type { Module } from "../../code-system/modules/module.page-type.types.ts"
import type { ChangeTargetType } from "../properties/change-target-type.relation-property.types.ts"

export type ChangeGuard = Module & {
  changeTargetType: ChangeTargetType
}
