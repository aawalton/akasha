import type { Code } from "akasha/code/module/properties/code.code-file-property.types.ts"
import type { Test } from "akasha/code/module/properties/test.code-file-property.types.ts"
import type { TestFixtures } from "akasha/code/module/properties/test-fixtures.code-file-property.types.ts"
import type { Holds } from "akasha/page/computed-property/properties/holds.select-property.types.ts"
import type { TargetPageType } from "akasha/page/relation-property/properties/target-page-type.relation-property.types.ts"
import type { SelectValues } from "akasha/page/select-property/properties/select-values.text-property.types.ts"
import type { PageProperty } from "akasha/page/type/page-property/page-property.page-type.types.ts"

export type ComputedProperty = PageProperty & {
  holds: Holds
  code: Code
  test?: Test
  testFixtures?: TestFixtures
  values?: SelectValues
  targetPageType?: TargetPageType
}
