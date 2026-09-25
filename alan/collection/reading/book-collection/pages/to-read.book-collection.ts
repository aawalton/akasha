import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const toRead = {
  id: "01a06808-148f-7037-b509-e773689b474e",
  type: "page-type/book-collection",
  slug: "to-read",
  title: "To Read",
  partOfCollections: ["book-collection/book-collections"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies BookCollection
