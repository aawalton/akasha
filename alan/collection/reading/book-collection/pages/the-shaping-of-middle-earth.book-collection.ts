import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const theShapingOfMiddleEarth = {
  id: "01a06808-148f-7030-80ab-dad071276e0b",
  type: "page-type/book-collection",
  slug: "the-shaping-of-middle-earth",
  title: "The Shaping of Middle-earth",
  partOfCollections: ["book-collection/the-history-of-middle-earth"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  publishedAt: "1986-01-01",
  createdAt: "2026-09-03T16:09:15.151Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookCollection
