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
  createdAt: "2026-09-03T16:09:15.150Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookCollection
