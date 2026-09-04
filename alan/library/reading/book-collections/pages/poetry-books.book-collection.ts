import type { BookCollection } from "../book-collection.page-type.ts"

export const poetryBooks = {
  id: "01a06808-148f-700b-a0bb-1a25a13f7917",
  pageTypeSlug: "book-collection",
  slug: "poetry-books",
  title: "Poetry Books",
  partOfSlugs: ["classics-collections"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "paused",
} as const satisfies BookCollection
