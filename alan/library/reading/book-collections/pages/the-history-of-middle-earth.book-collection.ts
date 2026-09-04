import type { BookCollection } from "../book-collection.page-type.ts"

export const theHistoryOfMiddleEarth = {
  id: "01a06808-148f-7025-988b-c8b1e697b6e3",
  pageTypeSlug: "book-collection",
  slug: "the-history-of-middle-earth",
  title: "The History of Middle-earth",
  partOfSlugs: ["the-lord-of-the-rings-books"],
  position: 9,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  publishedAt: "1983-01-01",
} as const satisfies BookCollection
