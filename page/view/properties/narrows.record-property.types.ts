import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { NarrowComparison } from "akasha/page/view/properties/narrow-comparison.select-property.types.ts"
import type { NarrowKey } from "akasha/page/view/properties/narrow-key.text-property.types.ts"
import type { NarrowValues } from "akasha/page/view/properties/narrow-values.text-property.types.ts"

export type Narrows = List<{
  key: NarrowKey
  comparison: NarrowComparison
  values: NarrowValues
}>
