import type { Book } from "../../book.page-type.ts"

export const theGreatBooksOfTheWesternWorld50Marx = {
  id: "019db533-f39d-77db-aaa4-c9ebc945209c",
  pageTypeSlug: "book",
  slug: "the-great-books-of-the-western-world-50-marx",
  title: "The Great Books of the Western World 50: Marx",
  status: "not-started",
  author: "Mark Twain",
  unitSlug: "words",
  position: 50,
  ownLength: 108500,
} as const satisfies Book
