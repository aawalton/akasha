import type { Module } from "../code-system/modules/module.page-type.ts"
import type { ChangeKind } from "../commands/properties/change-kind.relation-property.ts"
import type { ChangeMode } from "./properties/change-mode.relation-property.ts"
import type { ChangeTargetSubtype } from "./properties/change-target-subtype.relation-property.ts"
import type { ChangeTargetType } from "./properties/change-target-type.relation-property.ts"
import type { Temporary } from "./properties/temporary.boolean-property.ts"

export type Change = Module & {
  changeKind: ChangeKind
  temporary?: Temporary
  changeMode: ChangeMode
  changeTargetType?: ChangeTargetType
  changeTargetSubtype?: ChangeTargetSubtype
}
