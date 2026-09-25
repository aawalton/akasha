import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theGreatBooksOfTheWesternWorld5HerodotusThucydides = {
  id: "019db533-f39d-768a-aad5-9e1767a9cef6",
  type: "page-type/book",
  slug: "the-great-books-of-the-western-world-5-herodotus-thucydides",
  title: "The Great Books of the Western World 5: Herodotus, Thucydides",
  status: "completed",
  grade: "C",
  author: "Mortimer J. Adler",
  unit: "unit/words",
  position: 5,
  ownLength: 148250,
  ownProgress: 148250,
} as const satisfies Book
