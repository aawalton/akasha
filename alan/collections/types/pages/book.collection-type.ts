import type { CollectionType } from "akasha/alan/collections/types/collection-type.page-type.types.ts"

export const book = {
  id: "01a06579-855d-7003-b22a-9cb72fdef468",
  type: "collection-type",
  slug: "book",
  title: "Book",
  unit: "words",
  collectionTypeStatus: "done",
} as const satisfies CollectionType
