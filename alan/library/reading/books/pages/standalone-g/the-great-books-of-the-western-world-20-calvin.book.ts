import type { Book } from "../../book.page-type.ts"

export const theGreatBooksOfTheWesternWorld20Calvin = {
  id: "019db533-f39d-78a5-b6f1-d507f41e7512",
  pageTypeSlug: "book",
  slug: "the-great-books-of-the-western-world-20-calvin",
  title: "The Great Books of the Western World 20: Calvin",
  kind: "read",
  status: "not-started",
  author: "Silas Farmer",
  unitSlug: "words",
  position: 20,
  ownLength: 113750,
} as const satisfies Book
