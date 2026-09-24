import type { Code } from "akasha/code/module/properties/code.code-file-property.types.ts"
import type { Test } from "akasha/code/module/properties/test.code-file-property.types.ts"
import type { TestFixtures } from "akasha/code/module/properties/test-fixtures.code-file-property.types.ts"
import type { AskedByName } from "akasha/page/computed-property/properties/asked-by-name.boolean-property.types.ts"
import type { Holds } from "akasha/page/computed-property/properties/holds.select-property.types.ts"
import type { ReadFiles } from "akasha/page/computed-property/properties/read-files.text-property.types.ts"
import type { ReadFolders } from "akasha/page/computed-property/properties/read-folders.text-property.types.ts"
import type { TargetPageType } from "akasha/page/relation-property/properties/target-page-type.relation-property.types.ts"
import type { SelectValues } from "akasha/page/select-property/properties/select-values.text-property.types.ts"
import type { PageProperty } from "akasha/page/type/page-property/page-property.page-type.types.ts"
import type { Properties } from "akasha/page/type/properties/properties.one-of-property.types.ts"

export type ComputedProperty = PageProperty & {
  holds: Holds
  code: Code
  test?: Test
  testFixtures?: TestFixtures
  values?: SelectValues
  targetPageType?: TargetPageType
  properties?: Properties
  askedByName?: AskedByName
  readFiles?: ReadFiles
  readFolders?: ReadFolders
}
