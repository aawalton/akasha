import type { FilePropertyGroup } from "../../pages/file-property-groups/file-property-group.page-type.types.ts"
import type { Code } from "../modules/properties/code.code-file-property.ts"
import type { Test } from "../modules/properties/test.code-file-property.ts"
import type { TestFixtures } from "../modules/properties/test-fixtures.code-file-property.ts"

export type ModulePropertyGroup = FilePropertyGroup & {
  code?: Code
  test?: Test
  testFixtures?: TestFixtures
}
