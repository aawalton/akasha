import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const bruceRMcconkie = {
  id: "01a06808-148e-700e-9ed9-e6f80856bceb",
  type: "page-type/book-collection",
  slug: "bruce-r-mcconkie",
  title: "Bruce R. McConkie",
  partOfCollections: ["author-collection/apostles"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "paused",
  createdAt: "2026-09-03T16:09:15.150Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookCollection
