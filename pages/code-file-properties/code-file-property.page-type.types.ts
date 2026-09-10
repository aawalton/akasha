import type { FileProperty } from "../file-properties/file-property.page-type.types.ts"
import type { MaxCpuSeconds } from "./properties/max-cpu-seconds.number-property.types.ts"
import type { MaxMemoryMb } from "./properties/max-memory-mb.number-property.types.ts"
import type { MaxWallSeconds } from "./properties/max-wall-seconds.number-property.types.ts"

export type CodeFileProperty = FileProperty & {
  maxCpuSeconds?: MaxCpuSeconds
  maxWallSeconds?: MaxWallSeconds
  maxMemoryMb?: MaxMemoryMb
}
