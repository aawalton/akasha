import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const theFallOfGondolin = {
  id: "01a06808-148f-7022-8aed-b2d5df73b818",
  type: "page-type/book-collection",
  slug: "the-fall-of-gondolin",
  title: "The Fall of Gondolin",
  partOfCollections: ["book-collection/the-lord-of-the-rings-books"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  publishedAt: "2018-08-30",
} as const satisfies BookCollection
