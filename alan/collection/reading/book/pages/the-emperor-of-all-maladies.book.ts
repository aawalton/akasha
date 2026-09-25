import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theEmperorOfAllMaladies = {
  id: "019db533-f39d-7def-9ac5-fb3e8dc58ce2",
  type: "page-type/book",
  slug: "the-emperor-of-all-maladies",
  title: "The Emperor of All Maladies",
  status: "completed",
  grade: "B",
  author: "Siddhartha Mukherjee, Nessa Carey",
  unit: "unit/words",
  ownLength: 311250,
  ownProgress: 311250,
} as const satisfies Book
