import type { Book } from "../../book.page-type.ts"

export const theGreatBooksOfTheWesternWorld30Pascal = {
  id: "019db533-f39d-787c-a5be-8bef030005cb",
  pageTypeSlug: "book",
  slug: "the-great-books-of-the-western-world-30-pascal",
  title: "The Great Books of the Western World 30: Pascal",
  kind: "read",
  status: "not-started",
  author: "Blaise Pascal, Mortimer J. Adler",
  unitSlug: "words",
  position: 30,
  ownLength: 121750,
} as const satisfies Book
