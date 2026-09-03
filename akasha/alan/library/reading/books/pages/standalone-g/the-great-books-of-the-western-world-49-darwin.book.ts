import type { Book } from "../../book.page-type.ts"

export const theGreatBooksOfTheWesternWorld49Darwin = {
  id: "019db533-f39d-767d-bae9-bc882fcd51b9",
  pageTypeSlug: "book",
  slug: "the-great-books-of-the-western-world-49-darwin",
  title: "The Great Books of the Western World 49: Darwin",
  kind: "read",
  status: "not-started",
  author: "Charles Darwin",
  unitSlug: "words",
  position: 49,
  ownLength: 164750,
} as const satisfies Book
