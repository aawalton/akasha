import type { CollectionType } from "../collection-type.page-type.ts"

export const book = {
  id: "01a06579-855d-7003-b22a-9cb72fdef468",
  pageTypeSlug: "collection-type",
  slug: "book",
  title: "Book",
  unitSlug: "words",
  collectionTypeStatus: "done",
} as const satisfies CollectionType
