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
  createdAt: "2026-09-03T16:09:15.151Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookCollection
