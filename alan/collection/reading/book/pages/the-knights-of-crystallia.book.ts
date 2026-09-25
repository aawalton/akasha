import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theKnightsOfCrystallia = {
  id: "019db533-f39d-7206-a727-51eca1aae853",
  type: "page-type/book",
  slug: "the-knights-of-crystallia",
  title: "The Knights of Crystallia",
  status: "completed",
  grade: "B",
  author: "Brandon Sanderson",
  unit: "unit/words",
  position: 3,
  ownLength: 77250,
  ownProgress: 77250,
} as const satisfies Book
