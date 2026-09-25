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
} as const satisfies BookCollection
