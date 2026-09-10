import type { Domain } from "../../domains/domain.page-type.types.ts"
import type { ComponentCode } from "./properties/component-code.code-file-property.ts"
import type { ComponentTest } from "./properties/component-test.code-file-property.ts"
import type { ComponentTestFixtures } from "./properties/component-test-fixtures.code-file-property.ts"

export type Component = Domain & {
  code: ComponentCode
  test?: ComponentTest
  testFixtures?: ComponentTestFixtures
}
