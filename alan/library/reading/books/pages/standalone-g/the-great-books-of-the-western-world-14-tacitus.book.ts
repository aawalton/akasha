import type { Book } from "../../book.page-type.ts"

export const theGreatBooksOfTheWesternWorld14Tacitus = {
  id: "019db533-f39d-7906-9f6a-7b88578df4a5",
  pageTypeSlug: "book",
  slug: "the-great-books-of-the-western-world-14-tacitus",
  title: "The Great Books of the Western World 14: Tacitus",
  status: "not-started",
  author: "P. Cornelius Tacitus",
  unitSlug: "words",
  position: 14,
  ownLength: 75500,
} as const satisfies Book
