import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const theWarOfTheRing = {
  id: "01a06808-148f-7036-b290-7ee322fd548e",
  type: "page-type/book-collection",
  slug: "the-war-of-the-ring",
  title: "The War of the Ring",
  partOfCollections: ["book-collection/the-history-of-middle-earth"],
  position: 8,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  publishedAt: "1990-01-01",
} as const satisfies BookCollection
