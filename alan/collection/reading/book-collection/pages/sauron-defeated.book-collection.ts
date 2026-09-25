import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const sauronDefeated = {
  id: "01a06808-148f-700e-b5a9-17f26075e10a",
  type: "page-type/book-collection",
  slug: "sauron-defeated",
  title: "Sauron Defeated",
  partOfCollections: ["book-collection/the-history-of-middle-earth"],
  position: 9,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  publishedAt: "1992-01-01",
} as const satisfies BookCollection
