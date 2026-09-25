import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const petaybee = {
  id: "01a06808-148f-7008-b985-9e7ad4921149",
  type: "page-type/book-collection",
  slug: "petaybee",
  title: "Petaybee",
  partOfCollections: ["author/anne-mccaffrey"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies BookCollection
