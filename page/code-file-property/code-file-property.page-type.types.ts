import type { FixedExport } from "akasha/page/code-file-property/properties/fixed-export.text-property.types.ts"
import type { MaxCpuSeconds } from "akasha/page/code-file-property/properties/max-cpu-seconds.number-property.types.ts"
import type { MaxMemoryMb } from "akasha/page/code-file-property/properties/max-memory-mb.number-property.types.ts"
import type { MaxWallSeconds } from "akasha/page/code-file-property/properties/max-wall-seconds.number-property.types.ts"
import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export type CodeFileProperty = FileProperty & {
  maxCpuSeconds?: MaxCpuSeconds
  maxWallSeconds?: MaxWallSeconds
  maxMemoryMb?: MaxMemoryMb
  fixedExport?: FixedExport
}
