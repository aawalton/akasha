import type { BookCollection } from "akasha/alan/library/reading/book-collections/book-collection.page-type.types.ts"

export const foundingOfTheCommonwealth = {
  id: "01a06808-148e-7021-a64b-68d33f34a3e5",
  type: "book-collection",
  slug: "founding-of-the-commonwealth",
  title: "Founding of the Commonwealth",
  partOfCollections: ["alan-dean-foster"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies BookCollection
