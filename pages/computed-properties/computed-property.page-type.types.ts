import type { Code } from "akasha/code-system/modules/properties/code.code-file-property.ts"
import type { Test } from "akasha/code-system/modules/properties/test.code-file-property.ts"
import type { Holds } from "akasha/pages/computed-properties/properties/holds.select-property.types.ts"
import type { SelectValues } from "akasha/pages/select-properties/properties/select-values.text-property.ts"
import type { PageProperty } from "akasha/pages/types/page-properties/page-property.page-type.types.ts"

export type ComputedProperty = PageProperty & {
  holds: Holds
  code: Code
  test?: Test
  values?: SelectValues
}
