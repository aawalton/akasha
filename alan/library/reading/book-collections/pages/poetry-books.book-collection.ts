import type { BookCollection } from "../book-collection.page-type.types.ts"

export const poetryBooks = {
  id: "01a06808-148f-700b-a0bb-1a25a13f7917",
  pageTypeSlug: "book-collection",
  type: "book-collection",
  slug: "poetry-books",
  title: "Poetry Books",
  partOfCollections: ["classics-collections"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "paused",
} as const satisfies BookCollection
