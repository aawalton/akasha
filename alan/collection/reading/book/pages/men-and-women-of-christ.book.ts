import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const menAndWomenOfChrist = {
  id: "019db533-f39d-706e-ab10-aec8e6adb6e1",
  type: "page-type/book",
  slug: "men-and-women-of-christ",
  title: "Men and Women of Christ",
  status: "completed",
  grade: "C",
  author: "Neal A. Maxwell",
  unit: "unit/words",
  position: 5,
  ownLength: 33000,
  ownProgress: 33000,
} as const satisfies Book
