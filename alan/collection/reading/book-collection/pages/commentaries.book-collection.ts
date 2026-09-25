import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const commentaries = {
  id: "01a06808-148e-7012-84c7-f309c387c0b2",
  type: "page-type/book-collection",
  slug: "commentaries",
  title: "Commentaries",
  partOfCollections: ["book-collection/history-collections"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "paused",
} as const satisfies BookCollection
