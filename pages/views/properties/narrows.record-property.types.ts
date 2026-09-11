import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"
import type { NarrowComparison } from "akasha/pages/views/properties/narrow-comparison.select-property.types.ts"
import type { NarrowKey } from "akasha/pages/views/properties/narrow-key.text-property.types.ts"
import type { NarrowValues } from "akasha/pages/views/properties/narrow-values.text-property.types.ts"

export type Narrows = List<{
  key: NarrowKey
  comparison: NarrowComparison
  values: NarrowValues
}>
