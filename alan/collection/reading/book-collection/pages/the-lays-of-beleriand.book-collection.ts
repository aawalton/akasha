import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const theLaysOfBeleriand = {
  id: "01a06808-148f-7027-b348-2b7e9f9f48ac",
  type: "page-type/book-collection",
  slug: "the-lays-of-beleriand",
  title: "The Lays of Beleriand",
  partOfCollections: ["book-collection/the-history-of-middle-earth"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  publishedAt: "1985-01-01",
} as const satisfies BookCollection
