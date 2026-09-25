import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theGreatBooksOfTheWesternWorld3Homer = {
  id: "019db533-f39d-782f-a7f6-cf4a81ac03b6",
  type: "page-type/book",
  slug: "the-great-books-of-the-western-world-3-homer",
  title: "The Great Books of the Western World 3: Homer",
  status: "completed",
  grade: "B",
  author: "Όμηρος",
  unit: "unit/words",
  position: 3,
  ownLength: 135250,
  ownProgress: 135250,
} as const satisfies Book
