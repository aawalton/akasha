import type { CollectionType } from "akasha/alan/collection/type/collection-type.page-type.types.ts"

export const restaurantCollection = {
  id: "01a06579-855d-7013-a474-1fadfa2e42b3",
  type: "page-type/collection-type",
  slug: "restaurant-collection",
  title: "Restaurant Collection",
  unit: "unit/words",
  collectionTypeStatus: "not-doing",
} as const satisfies CollectionType
