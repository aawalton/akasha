import type { ChangeMaxCpuSeconds } from "akasha/changes/properties/change-max-cpu-seconds.number-property.types.ts"
import type { ChangeMode } from "akasha/changes/properties/change-mode.relation-property.types.ts"
import type { ChangeTargetSubtype } from "akasha/changes/properties/change-target-subtype.relation-property.types.ts"
import type { ChangeTargetType } from "akasha/changes/properties/change-target-type.relation-property.types.ts"
import type { Temporary } from "akasha/changes/properties/temporary.boolean-property.types.ts"
import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"
import type { ChangeKind } from "akasha/commands/properties/change-kind.relation-property.types.ts"

export type Change = Module & {
  changeKind: ChangeKind
  temporary?: Temporary
  changeMode: ChangeMode
  changeTargetType?: ChangeTargetType
  changeTargetSubtype?: ChangeTargetSubtype
  maxCpuSeconds?: ChangeMaxCpuSeconds
}
