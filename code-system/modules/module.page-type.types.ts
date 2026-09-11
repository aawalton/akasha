import type { Code } from "akasha/code-system/modules/properties/code.code-file-property.ts"
import type { ModuleTypes } from "akasha/code-system/modules/properties/module-types.file-property.ts"
import type { Test } from "akasha/code-system/modules/properties/test.code-file-property.ts"
import type { TestFixtures } from "akasha/code-system/modules/properties/test-fixtures.code-file-property.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"
import type { AllowsTmpPaths } from "akasha/pages/types/properties/allows-tmp-paths.boolean-property.types.ts"

export type Module = Domain & {
  code: Code
  types?: ModuleTypes
  test?: Test
  testFixtures?: TestFixtures
  allowsTmpPaths?: AllowsTmpPaths
}
