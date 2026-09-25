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
} as const satisfies BookCollection
