import type { BookCollection } from "akasha/alan/library/reading/book-collections/book-collection.page-type.types.ts"

export const nonesuchDickens = {
  id: "01a06808-148f-7006-88b5-460c3b420aa5",
  type: "book-collection",
  slug: "nonesuch-dickens",
  title: "Nonesuch Dickens",
  partOfCollections: ["classics-collections"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies BookCollection
