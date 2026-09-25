import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theGreatBooksOfTheWesternWorld46AustenGeorgeElliot = {
  id: "019db533-f39d-7705-9721-52eacf762553",
  type: "page-type/book",
  slug: "the-great-books-of-the-western-world-46-austen-george-elliot",
  title: "The Great Books of the Western World 46: Austen, George Elliot",
  status: "not-started",
  unit: "unit/words",
  position: 46,
  ownLength: 150000,
} as const satisfies Book
