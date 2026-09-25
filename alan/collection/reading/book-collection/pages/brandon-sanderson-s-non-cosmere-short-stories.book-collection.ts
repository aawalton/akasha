import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const brandonSandersonSNonCosmereShortStories = {
  id: "01a06808-148e-700d-888d-d8cf9fb001d7",
  type: "page-type/book-collection",
  slug: "brandon-sanderson-s-non-cosmere-short-stories",
  title: "Brandon Sanderson’s Non-Cosmere Short Stories",
  partOfCollections: ["book-collection/brandon-sanderson-s-non-cosmere-books"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "completed",
} as const satisfies BookCollection
