import type { AuthorCollection } from "akasha/alan/collection/reading/author-collection/author-collection.page-type.types.ts"

export const churchScholars = {
  id: "01a06808-06b4-7002-b8fa-83e0fa8481f1",
  type: "page-type/author-collection",
  slug: "church-scholars",
  title: "Church Scholars",
  partOfCollections: ["book-collection/faith-collections"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies AuthorCollection
