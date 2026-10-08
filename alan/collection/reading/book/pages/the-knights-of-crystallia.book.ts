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
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
