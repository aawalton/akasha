import type { CollectionType } from "akasha/alan/collection/type/collection-type.page-type.types.ts"

export const recipeCollection = {
  id: "01a06579-855d-700f-ae15-ab94a81f8ad7",
  type: "collection-type",
  slug: "recipe-collection",
  title: "Recipe Collection",
  unit: "unit/words",
  collectionTypeStatus: "not-doing",
} as const satisfies CollectionType
