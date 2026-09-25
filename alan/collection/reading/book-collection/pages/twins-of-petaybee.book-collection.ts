import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const twinsOfPetaybee = {
  id: "01a06808-148f-703a-8283-3db637f3a349",
  type: "page-type/book-collection",
  slug: "twins-of-petaybee",
  title: "Twins of Petaybee",
  partOfCollections: ["author/anne-mccaffrey"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies BookCollection
