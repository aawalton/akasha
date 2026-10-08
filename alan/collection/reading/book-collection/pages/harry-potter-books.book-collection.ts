import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const harryPotterBooks = {
  id: "01a06808-148e-7024-a2c4-b2920bc5e366",
  type: "page-type/book-collection",
  slug: "harry-potter-books",
  title: "Harry Potter Books",
  partOfCollections: ["fandom/harry-potter"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "following",
  grade: "B",
  createdAt: "2026-09-03T16:09:15.150Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookCollection
