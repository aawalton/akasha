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
  createdAt: "2026-09-03T16:09:15.150Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookCollection
