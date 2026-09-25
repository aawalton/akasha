import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const biographies = {
  id: "01a06808-148e-7006-a0e6-877c7026f3d3",
  type: "page-type/book-collection",
  slug: "biographies",
  title: "Biographies",
  partOfCollections: ["book-collection/faith-collections"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "paused",
} as const satisfies BookCollection
