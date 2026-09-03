import type { Book } from "../../book.page-type.ts"

export const theGreatBooksOfTheWesternWorld36AdamSmith = {
  id: "019db533-f39d-7623-bd07-3642a53f41ec",
  pageTypeSlug: "book",
  slug: "the-great-books-of-the-western-world-36-adam-smith",
  title: "The Great Books of the Western World 36: Adam Smith",
  kind: "read",
  status: "not-started",
  author: "William Shakespeare",
  unitSlug: "words",
  position: 36,
  ownLength: 128750,
} as const satisfies Book
