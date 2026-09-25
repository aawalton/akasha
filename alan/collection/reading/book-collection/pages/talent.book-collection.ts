import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const talent = {
  id: "01a06808-148f-7014-be21-6a7b03ee73ff",
  type: "page-type/book-collection",
  slug: "talent",
  title: "Talent",
  partOfCollections: ["author/anne-mccaffrey"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies BookCollection
