import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const alcatraz = {
  id: "01a06808-148e-7001-9e7d-64c0c87293ac",
  type: "page-type/book-collection",
  slug: "alcatraz",
  title: "Alcatraz",
  partOfCollections: ["book-collection/brandon-sanderson-s-non-cosmere-books"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "completed",
  grade: "B",
} as const satisfies BookCollection
