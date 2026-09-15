import type { CollectionType } from "akasha/alan/collection/type/collection-type.page-type.types.ts"

export const fandomCollection = {
  id: "01a06579-855d-7006-89d8-d47ae525e6ef",
  type: "page-type/collection-type",
  slug: "fandom-collection",
  title: "Fandom Collection",
  unit: "unit/words",
  collectionTypeStatus: "not-doing",
} as const satisfies CollectionType
