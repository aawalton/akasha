import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const thePeoplesOfMiddleEarth = {
  id: "01a06808-148f-702c-8d1d-1c29fbe9c757",
  type: "page-type/book-collection",
  slug: "the-peoples-of-middle-earth",
  title: "The Peoples of Middle-earth",
  partOfCollections: ["book-collection/the-history-of-middle-earth"],
  position: 12,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  publishedAt: "1996-01-01",
} as const satisfies BookCollection
