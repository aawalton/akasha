import type { MonarchRecord } from "../records/monarch-record.page-type.types.ts"
import type { CategoryGroup } from "./properties/category-group.text-property.ts"
import type { CategoryGroupType } from "./properties/category-group-type.select-property.ts"

export type MonarchCategory = MonarchRecord & {
  categoryGroup?: CategoryGroup
  categoryGroupType?: CategoryGroupType
}
