import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const theDamnedTrilogy = {
  id: "01a06808-148f-7021-9cda-e2774b287074",
  type: "page-type/book-collection",
  slug: "the-damned-trilogy",
  title: "The Damned Trilogy",
  partOfCollections: ["author/alan-dean-foster"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies BookCollection
