import type { CollectionType } from "../collection-type.page-type.ts"

export const bookCollection = {
  id: "01a06579-855d-7001-ac63-0eab7a76b0e0",
  pageTypeSlug: "collection-type",
  slug: "book-collection",
  title: "Book Collection",
  unitSlug: "words",
  collectionTypeStatus: "not-doing",
} as const satisfies CollectionType
