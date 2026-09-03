import type { Book } from "../../book.page-type.ts"

export const theGreatBooksOfTheWesternWorld52DostoevskyIbsen = {
  id: "019db533-f39d-7698-8fcb-6fc610906060",
  pageTypeSlug: "book",
  slug: "the-great-books-of-the-western-world-52-dostoevsky-ibsen",
  title: "The Great Books of the Western World 52: Dostoevsky, Ibsen",
  kind: "read",
  status: "not-started",
  unitSlug: "words",
  position: 52,
  ownLength: 149250,
} as const satisfies Book
