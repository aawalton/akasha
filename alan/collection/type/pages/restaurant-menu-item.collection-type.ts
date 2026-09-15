import type { CollectionType } from "akasha/alan/collection/type/collection-type.page-type.types.ts"

export const restaurantMenuItem = {
  id: "01a06579-855d-7014-8763-cf229a87fd77",
  type: "page-type/collection-type",
  slug: "restaurant-menu-item",
  title: "Restaurant Menu Item",
  unit: "unit/words",
  collectionTypeStatus: "not-doing",
} as const satisfies CollectionType
