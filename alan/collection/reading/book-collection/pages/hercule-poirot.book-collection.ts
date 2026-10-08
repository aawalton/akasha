import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const herculePoirot = {
  id: "01a06808-148e-7026-afbc-eb1b805c9113",
  type: "page-type/book-collection",
  slug: "hercule-poirot",
  title: "Hercule Poirot",
  partOfCollections: ["author/agatha-christie"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  createdAt: "2026-09-03T16:09:15.150Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookCollection
