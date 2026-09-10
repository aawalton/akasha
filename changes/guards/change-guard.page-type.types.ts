import type { Module } from "../../code-system/modules/module.page-type.ts"
import type { ChangeTargetType } from "../properties/change-target-type.relation-property.ts"

export type ChangeGuard = Module & {
  changeTargetType: ChangeTargetType
}
