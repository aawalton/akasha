import type { MaxCpuSeconds } from "../../pages/code-file-properties/properties/max-cpu-seconds.number-property.ts"
import type { MaxMemoryMb } from "../../pages/code-file-properties/properties/max-memory-mb.number-property.ts"
import type { MaxWallSeconds } from "../../pages/code-file-properties/properties/max-wall-seconds.number-property.ts"
import type { FilePropertyGroup } from "../../pages/file-property-groups/file-property-group.page-type.types.ts"
import type { Code } from "../modules/properties/code.code-file-property.ts"
import type { Test } from "../modules/properties/test.code-file-property.ts"
import type { TestFixtures } from "../modules/properties/test-fixtures.code-file-property.ts"

export type ModulePropertyGroup = FilePropertyGroup & {
  code?: Code
  test?: Test
  testFixtures?: TestFixtures
  maxCpuSeconds?: MaxCpuSeconds
  maxWallSeconds?: MaxWallSeconds
  maxMemoryMb?: MaxMemoryMb
}
