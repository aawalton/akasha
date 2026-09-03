import type { BookCollection } from "../book-collection.page-type.ts"

export const bookCollections = {
  id: "01a06808-148e-7008-b1f1-e772954a9d02",
  pageTypeSlug: "book-collection",
  slug: "book-collections",
  title: "Book Collections",
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-applicable",
} as const satisfies BookCollection
