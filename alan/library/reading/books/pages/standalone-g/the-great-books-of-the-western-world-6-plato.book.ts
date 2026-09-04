import type { Book } from "../../book.page-type.ts"

export const theGreatBooksOfTheWesternWorld6Plato = {
  id: "019db533-f39d-76c9-9969-c53c0ecab7e5",
  pageTypeSlug: "book",
  slug: "the-great-books-of-the-western-world-6-plato",
  title: "The Great Books of the Western World 6: Plato",
  status: "completed",
  rank: "B",
  author: "Plato",
  unitSlug: "words",
  position: 6,
  ownLength: 203500,
  ownProgress: 203500,
} as const satisfies Book
