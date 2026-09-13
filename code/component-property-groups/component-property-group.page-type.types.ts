import type { ComponentCode } from "akasha/code/components/properties/component-code.code-file-property.types.ts"
import type { ComponentTest } from "akasha/code/components/properties/component-test.code-file-property.types.ts"
import type { ComponentTestFixtures } from "akasha/code/components/properties/component-test-fixtures.code-file-property.types.ts"
import type { FilePropertyGroup } from "akasha/pages/file-property-groups/file-property-group.page-type.types.ts"

export type ComponentPropertyGroup = FilePropertyGroup & {
  code?: ComponentCode
  test?: ComponentTest
  testFixtures?: ComponentTestFixtures
}
