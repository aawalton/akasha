import type { Change } from "akasha/change/change.page-type.types.ts"
import type { ChangeMaxCpuSeconds } from "akasha/change/properties/change-max-cpu-seconds.number-property.types.ts"
import type { ChangeMaxMemoryMb } from "akasha/change/properties/change-max-memory-mb.number-property.types.ts"

export type ChangeAgent = Change & {
  maxCpuSeconds: ChangeMaxCpuSeconds
  maxMemoryMb: ChangeMaxMemoryMb
}
