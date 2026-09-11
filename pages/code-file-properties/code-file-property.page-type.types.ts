import type { MaxCpuSeconds } from "akasha/pages/code-file-properties/properties/max-cpu-seconds.number-property.types.ts"
import type { MaxMemoryMb } from "akasha/pages/code-file-properties/properties/max-memory-mb.number-property.types.ts"
import type { MaxWallSeconds } from "akasha/pages/code-file-properties/properties/max-wall-seconds.number-property.types.ts"
import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export type CodeFileProperty = FileProperty & {
  maxCpuSeconds?: MaxCpuSeconds
  maxWallSeconds?: MaxWallSeconds
  maxMemoryMb?: MaxMemoryMb
}
