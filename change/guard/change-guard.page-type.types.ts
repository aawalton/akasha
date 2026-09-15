import type { ChangeTargetType } from "akasha/change/properties/change-target-type.relation-property.types.ts"
import type { Module } from "akasha/code/module/module.page-type.types.ts"

export type ChangeGuard = Module & {
  changeTargetType: ChangeTargetType
}
