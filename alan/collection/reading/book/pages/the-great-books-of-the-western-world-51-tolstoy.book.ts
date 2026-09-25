import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theGreatBooksOfTheWesternWorld51Tolstoy = {
  id: "019db533-f39d-77ca-8de1-5120d42e17cb",
  type: "page-type/book",
  slug: "the-great-books-of-the-western-world-51-tolstoy",
  title: "The Great Books of the Western World 51: Tolstoy",
  status: "not-started",
  author: "Лев Толстой",
  unit: "unit/words",
  position: 51,
  ownLength: 174000,
} as const satisfies Book
