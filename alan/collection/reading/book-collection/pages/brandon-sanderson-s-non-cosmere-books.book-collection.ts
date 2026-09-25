import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const brandonSandersonSNonCosmereBooks = {
  id: "01a06808-148e-700c-a652-862eed8e408f",
  type: "page-type/book-collection",
  slug: "brandon-sanderson-s-non-cosmere-books",
  title: "Brandon Sanderson’s Non-Cosmere Books",
  partOfCollections: ["book-collection/brandon-sanderson"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "paused",
} as const satisfies BookCollection
