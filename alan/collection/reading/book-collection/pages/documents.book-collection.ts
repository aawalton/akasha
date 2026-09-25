import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const documents = {
  id: "01a06808-148e-701c-ab41-27b264171e4e",
  type: "page-type/book-collection",
  slug: "documents",
  title: "Documents",
  partOfCollections: ["book-collection/the-joseph-smith-papers"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies BookCollection
