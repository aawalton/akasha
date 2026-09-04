import type { Book } from "../../book.page-type.ts"

export const theGreatBooksOfTheWesternWorld3Homer = {
  id: "019db533-f39d-782f-a7f6-cf4a81ac03b6",
  pageTypeSlug: "book",
  slug: "the-great-books-of-the-western-world-3-homer",
  title: "The Great Books of the Western World 3: Homer",
  status: "completed",
  rank: "B",
  author: "Όμηρος",
  unitSlug: "words",
  position: 3,
  ownLength: 135250,
  ownProgress: 135250,
} as const satisfies Book
