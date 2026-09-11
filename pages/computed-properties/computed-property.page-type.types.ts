import type { Code } from "akasha/code/modules/properties/code.code-file-property.types.ts"
import type { Test } from "akasha/code/modules/properties/test.code-file-property.types.ts"
import type { TestFixtures } from "akasha/code/modules/properties/test-fixtures.code-file-property.types.ts"
import type { Holds } from "akasha/pages/computed-properties/properties/holds.select-property.types.ts"
import type { SelectValues } from "akasha/pages/select-properties/properties/select-values.text-property.types.ts"
import type { PageProperty } from "akasha/pages/types/page-properties/page-property.page-type.types.ts"

export type ComputedProperty = PageProperty & {
  holds: Holds
  code: Code
  test?: Test
  testFixtures?: TestFixtures
  values?: SelectValues
}
