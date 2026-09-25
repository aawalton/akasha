import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const brandonSanderson = {
  id: "01a06808-148e-700a-805d-63e9b1a15d86",
  type: "page-type/book-collection",
  slug: "brandon-sanderson",
  title: "Brandon Sanderson",
  partOfCollections: ["author-collection/fantasy-authors"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "paused",
} as const satisfies BookCollection
