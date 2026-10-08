import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const theBookOfLostTalesPartTwo = {
  id: "01a06808-148f-7018-b956-1e1870c925bd",
  type: "page-type/book-collection",
  slug: "the-book-of-lost-tales-part-two",
  title: "The Book of Lost Tales, Part Two",
  partOfCollections: ["book-collection/the-history-of-middle-earth"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  publishedAt: "1984-01-01",
  createdAt: "2026-09-03T16:09:15.151Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookCollection
