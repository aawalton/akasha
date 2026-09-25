import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const acorna = {
  id: "01a06808-148d-7000-8fd3-6c5914c2df3e",
  type: "page-type/book-collection",
  slug: "acorna",
  title: "Acorna",
  partOfCollections: ["author/anne-mccaffrey"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies BookCollection
