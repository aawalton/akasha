import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { SortDescending } from "akasha/page/view/properties/sort-descending.boolean-property.types.ts"
import type { SortKey } from "akasha/page/view/properties/sort-key.text-property.types.ts"

export type ViewSorts = List<{
  key: SortKey
  descending: SortDescending
}>
