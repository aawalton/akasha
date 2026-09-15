import type { ChangeKind } from "akasha/change/properties/change-kind.relation-property.types.ts"
import type { ChangeMaxCpuSeconds } from "akasha/change/properties/change-max-cpu-seconds.number-property.types.ts"
import type { ChangeMaxMemoryMb } from "akasha/change/properties/change-max-memory-mb.number-property.types.ts"
import type { ChangeMode } from "akasha/change/properties/change-mode.relation-property.types.ts"
import type { ChangeTargetSubtype } from "akasha/change/properties/change-target-subtype.relation-property.types.ts"
import type { ChangeTargetType } from "akasha/change/properties/change-target-type.relation-property.types.ts"
import type { TakesAtMost } from "akasha/change/properties/takes-at-most.boolean-property.types.ts"
import type { Temporary } from "akasha/change/properties/temporary.boolean-property.types.ts"
import type { Module } from "akasha/code/module/module.page-type.types.ts"

export type Change = Module & {
  changeKind: ChangeKind
  temporary?: Temporary
  takesAtMost?: TakesAtMost
  changeMode: ChangeMode
  maxCpuSeconds?: ChangeMaxCpuSeconds
  maxMemoryMb?: ChangeMaxMemoryMb
  changeTargetType: ChangeTargetType
  changeTargetSubtype: ChangeTargetSubtype
}
