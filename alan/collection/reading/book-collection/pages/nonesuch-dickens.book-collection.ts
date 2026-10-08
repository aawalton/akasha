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
  createdAt: "2026-09-03T16:09:15.151Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookCollection
