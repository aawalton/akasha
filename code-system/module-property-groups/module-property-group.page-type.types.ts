import type { GroupMaxCpuSeconds } from "akasha/code-system/module-property-groups/properties/group-max-cpu-seconds.number-property.types.ts"
import type { GroupMaxMemoryMb } from "akasha/code-system/module-property-groups/properties/group-max-memory-mb.number-property.types.ts"
import type { GroupMaxWallSeconds } from "akasha/code-system/module-property-groups/properties/group-max-wall-seconds.number-property.types.ts"
import type { Logs } from "akasha/code-system/module-property-groups/properties/logs.file-property.types.ts"
import type { Code } from "akasha/code-system/modules/properties/code.code-file-property.types.ts"
import type { Test } from "akasha/code-system/modules/properties/test.code-file-property.types.ts"
import type { TestFixtures } from "akasha/code-system/modules/properties/test-fixtures.code-file-property.types.ts"
import type { FilePropertyGroup } from "akasha/pages/file-property-groups/file-property-group.page-type.types.ts"

export type ModulePropertyGroup = FilePropertyGroup & {
  code?: Code
  test?: Test
  testFixtures?: TestFixtures
  logs?: Logs
  maxCpuSeconds?: GroupMaxCpuSeconds
  maxWallSeconds?: GroupMaxWallSeconds
  maxMemoryMb?: GroupMaxMemoryMb
}
