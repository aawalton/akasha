import type { Book } from "../../book.page-type.ts"

export const theGreatBooksOfTheWesternWorld47Dickens = {
  id: "019db533-f39d-76f7-b3f2-8c2ff4fe2269",
  pageTypeSlug: "book",
  slug: "the-great-books-of-the-western-world-47-dickens",
  title: "The Great Books of the Western World 47: Dickens",
  kind: "read",
  status: "not-started",
  author: "Daniel Defoe, J. J. Grandville, Petrus Borel, Les éditions du Rey, N. C. Wyeth",
  unitSlug: "words",
  position: 47,
  ownLength: 106250,
} as const satisfies Book
