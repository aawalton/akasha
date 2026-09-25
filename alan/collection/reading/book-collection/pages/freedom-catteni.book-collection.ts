import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const freedomCatteni = {
  id: "01a06808-148e-7023-8d44-713d7b834054",
  type: "page-type/book-collection",
  slug: "freedom-catteni",
  title: "Freedom (Catteni)",
  partOfCollections: ["author/anne-mccaffrey"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies BookCollection
