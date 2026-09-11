import type { ChangeTargetType } from "akasha/changes/properties/change-target-type.relation-property.types.ts"
import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export type ChangeGuard = Module & {
  changeTargetType: ChangeTargetType
}
