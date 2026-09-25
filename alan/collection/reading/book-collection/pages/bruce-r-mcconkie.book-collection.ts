import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const bruceRMcconkie = {
  id: "01a06808-148e-700e-9ed9-e6f80856bceb",
  type: "page-type/book-collection",
  slug: "bruce-r-mcconkie",
  title: "Bruce R. McConkie",
  partOfCollections: ["author-collection/apostles"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "paused",
} as const satisfies BookCollection
