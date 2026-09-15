import type { CollectionType } from "akasha/alan/collection/type/collection-type.page-type.types.ts"

export const authorCollection = {
  id: "01a06579-855c-7002-a4b8-1a1937eb6822",
  type: "page-type/collection-type",
  slug: "author-collection",
  title: "Author Collection",
  unit: "unit/words",
  collectionTypeStatus: "not-doing",
} as const satisfies CollectionType
