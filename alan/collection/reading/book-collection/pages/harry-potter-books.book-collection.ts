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
} as const satisfies BookCollection
