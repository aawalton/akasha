import type { CollectionType } from "../collection-type.page-type.types.ts"

export const restaurantCollection = {
  id: "01a06579-855d-7013-a474-1fadfa2e42b3",
  pageTypeSlug: "collection-type",
  type: "collection-type",
  slug: "restaurant-collection",
  title: "Restaurant Collection",
  unit: "words",
  collectionTypeStatus: "not-doing",
} as const satisfies CollectionType
