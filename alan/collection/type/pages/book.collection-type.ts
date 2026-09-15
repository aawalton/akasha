import type { CollectionType } from "akasha/alan/collection/type/collection-type.page-type.types.ts"

export const book = {
  id: "01a06579-855d-7003-b22a-9cb72fdef468",
  type: "page-type/collection-type",
  slug: "book",
  title: "Book",
  unit: "unit/words",
  collectionTypeStatus: "done",
} as const satisfies CollectionType
