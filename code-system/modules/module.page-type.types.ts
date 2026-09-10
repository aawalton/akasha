import type { Domain } from "../../domains/domain.page-type.types.ts"
import type { AllowsTmpPaths } from "../../pages/types/properties/allows-tmp-paths.boolean-property.ts"
import type { Code } from "./properties/code.code-file-property.ts"
import type { ModuleTypes } from "./properties/module-types.file-property.ts"
import type { Test } from "./properties/test.code-file-property.ts"
import type { TestFixtures } from "./properties/test-fixtures.code-file-property.ts"

export type Module = Domain & {
  code: Code
  types?: ModuleTypes
  test?: Test
  testFixtures?: TestFixtures
  allowsTmpPaths?: AllowsTmpPaths
}
