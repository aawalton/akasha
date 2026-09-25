import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const acornaSChildren = {
  id: "01a06808-148e-7000-a321-5ca258870351",
  type: "page-type/book-collection",
  slug: "acorna-s-children",
  title: "Acorna's Children",
  partOfCollections: ["author/anne-mccaffrey"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies BookCollection
