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
  createdAt: "2026-09-03T16:09:15.150Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookCollection
