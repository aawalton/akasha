import type { Change } from "akasha/changes/change.page-type.types.ts"
import type { ChangeMaxCpuSeconds } from "akasha/changes/properties/change-max-cpu-seconds.number-property.types.ts"
import type { ChangeMaxMemoryMb } from "akasha/changes/properties/change-max-memory-mb.number-property.types.ts"

export type ChangeAgent = Change & {
  maxCpuSeconds: ChangeMaxCpuSeconds
  maxMemoryMb: ChangeMaxMemoryMb
}
