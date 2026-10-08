import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const cytoverse = {
  id: "01a06808-148e-7015-9a3d-1fd2381f8643",
  type: "page-type/book-collection",
  slug: "cytoverse",
  title: "Cytoverse",
  partOfCollections: ["book-collection/brandon-sanderson-s-non-cosmere-books"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "completed",
  createdAt: "2026-09-03T16:09:15.150Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookCollection
