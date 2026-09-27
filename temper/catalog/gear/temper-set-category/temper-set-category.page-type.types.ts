import type { EsoCategoryNames } from "akasha/temper/catalog/gear/temper-set-category/properties/eso-category-names.text-property.types.ts"
import type { NestedEsoCategoryNames } from "akasha/temper/catalog/gear/temper-set-category/properties/nested-eso-category-names.text-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/thing/temper-catalog-thing.page-type.types.ts"
import type { ActivityCategory } from "akasha/temper/player/progress/temper-activity-category/properties/activity-category.relation-property.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperSetCategory = TemperCatalogThing & {
  key: Key
  displayOrder: DisplayOrder
  activity?: ActivityCategory
  esoCategoryNames?: EsoCategoryNames
  nestedEsoCategoryNames?: NestedEsoCategoryNames
}
