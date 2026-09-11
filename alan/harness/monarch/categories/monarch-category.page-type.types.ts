import type { CategoryGroup } from "akasha/alan/harness/monarch/categories/properties/category-group.text-property.types.ts"
import type { CategoryGroupType } from "akasha/alan/harness/monarch/categories/properties/category-group-type.select-property.types.ts"
import type { MonarchRecord } from "akasha/alan/harness/monarch/records/monarch-record.page-type.types.ts"

export type MonarchCategory = MonarchRecord & {
  categoryGroup?: CategoryGroup
  categoryGroupType?: CategoryGroupType
}
