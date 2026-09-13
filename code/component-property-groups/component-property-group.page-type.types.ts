import type { Code } from "akasha/code/modules/properties/code.code-file-property.types.ts"
import type { Test } from "akasha/code/modules/properties/test.code-file-property.types.ts"
import type { TestFixtures } from "akasha/code/modules/properties/test-fixtures.code-file-property.types.ts"
import type { FilePropertyGroup } from "akasha/pages/file-property-groups/file-property-group.page-type.types.ts"

export type ComponentPropertyGroup = FilePropertyGroup & {
  code?: Code
  test?: Test
  testFixtures?: TestFixtures
}
