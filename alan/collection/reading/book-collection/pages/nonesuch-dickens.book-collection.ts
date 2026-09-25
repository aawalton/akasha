import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const nonesuchDickens = {
  id: "01a06808-148f-7006-88b5-460c3b420aa5",
  type: "page-type/book-collection",
  slug: "nonesuch-dickens",
  title: "Nonesuch Dickens",
  partOfCollections: ["book-collection/classics-collections"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies BookCollection
