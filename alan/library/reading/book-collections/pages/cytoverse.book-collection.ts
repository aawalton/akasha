import type { BookCollection } from "../book-collection.page-type.ts"

export const cytoverse = {
  id: "01a06808-148e-7015-9a3d-1fd2381f8643",
  pageTypeSlug: "book-collection",
  type: "book-collection",
  slug: "cytoverse",
  title: "Cytoverse",
  partOfCollections: ["brandon-sanderson-s-non-cosmere-books"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "completed",
} as const satisfies BookCollection
