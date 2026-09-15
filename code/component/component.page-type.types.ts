import type { ComponentCode } from "akasha/code/component/properties/component-code.code-file-property.types.ts"
import type { ComponentTest } from "akasha/code/component/properties/component-test.code-file-property.types.ts"
import type { ComponentTestFixtures } from "akasha/code/component/properties/component-test-fixtures.code-file-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export type Component = Domain & {
  code: ComponentCode
  test?: ComponentTest
  testFixtures?: ComponentTestFixtures
}
