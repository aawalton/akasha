import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"
import type { SortDescending } from "akasha/pages/views/properties/sort-descending.boolean-property.types.ts"
import type { SortKey } from "akasha/pages/views/properties/sort-key.text-property.types.ts"

export type ViewSorts = List<{
  key: SortKey
  descending: SortDescending
}>
