import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const humanxCommonwealth = {
  id: "01a06808-148e-702b-8521-f2e9220a813f",
  type: "page-type/book-collection",
  slug: "humanx-commonwealth",
  title: "Humanx Commonwealth",
  partOfCollections: ["author/alan-dean-foster"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies BookCollection
