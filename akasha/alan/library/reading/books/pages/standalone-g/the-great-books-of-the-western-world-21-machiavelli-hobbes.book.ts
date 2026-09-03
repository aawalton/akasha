import type { Book } from "../../book.page-type.ts"

export const theGreatBooksOfTheWesternWorld21MachiavelliHobbes = {
  id: "019db533-f39d-7861-a9f3-5de3ee487e3e",
  pageTypeSlug: "book",
  slug: "the-great-books-of-the-western-world-21-machiavelli-hobbes",
  title: "The Great Books of the Western World 21: Machiavelli, Hobbes",
  kind: "read",
  status: "not-started",
  author: "Ed Mortimer J. Adler",
  unitSlug: "words",
  position: 21,
  ownLength: 70750,
} as const satisfies Book
