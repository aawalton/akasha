import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const foundingOfTheCommonwealth = {
  id: "01a06808-148e-7021-a64b-68d33f34a3e5",
  type: "page-type/book-collection",
  slug: "founding-of-the-commonwealth",
  title: "Founding of the Commonwealth",
  partOfCollections: ["author/alan-dean-foster"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies BookCollection
