import type { CollectionType } from "akasha/alan/collections/types/collection-type.page-type.types.ts"

export const bookSeries = {
  id: "01a06579-855d-7002-ab9f-05d44875e69d",
  type: "collection-type",
  slug: "book-series",
  title: "Book Series",
  unit: "words",
  collectionTypeStatus: "done",
} as const satisfies CollectionType
