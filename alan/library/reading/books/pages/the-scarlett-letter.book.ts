import type { Book } from "akasha/alan/library/reading/books/book.page-type.types.ts"

export const theScarlettLetter = {
  id: "019db533-f39d-7577-8bd0-1e32c0fb918c",
  type: "book",
  slug: "the-scarlett-letter",
  title: "The Scarlett Letter",
  status: "not-started",
  author: "Nathaniel Hawthorne",
  unit: "words",
  position: 7,
  ownLength: 72750,
} as const satisfies Book
