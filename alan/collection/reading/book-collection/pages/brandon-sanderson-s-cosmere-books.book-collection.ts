import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const brandonSandersonSCosmereBooks = {
  id: "01a06808-148e-700b-bf2a-18fe855b306e",
  type: "page-type/book-collection",
  slug: "brandon-sanderson-s-cosmere-books",
  title: "Brandon Sanderson’s Cosmere Books",
  partOfCollections: ["book-collection/brandon-sanderson"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "paused",
  createdAt: "2026-09-03T16:09:15.150Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookCollection
