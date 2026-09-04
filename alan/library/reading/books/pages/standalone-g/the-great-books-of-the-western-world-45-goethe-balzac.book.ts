import type { Book } from "../../book.page-type.ts"

export const theGreatBooksOfTheWesternWorld45GoetheBalzac = {
  id: "019db533-f39d-763d-b03f-ce5d4502f1e4",
  pageTypeSlug: "book",
  slug: "the-great-books-of-the-western-world-45-goethe-balzac",
  title: "The Great Books of the Western World 45: Goethe, Balzac",
  kind: "read",
  status: "not-started",
  unitSlug: "words",
  position: 45,
  ownLength: 92500,
} as const satisfies Book
