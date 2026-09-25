import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theGreatBooksOfTheWesternWorld35MontesquieuRousseau = {
  id: "019db533-f39d-76ef-9088-69462deb10d8",
  type: "page-type/book",
  slug: "the-great-books-of-the-western-world-35-montesquieu-rousseau",
  title: "The Great Books of the Western World 35: Montesquieu, Rousseau",
  status: "not-started",
  unit: "unit/words",
  position: 35,
  ownLength: 109750,
} as const satisfies Book
