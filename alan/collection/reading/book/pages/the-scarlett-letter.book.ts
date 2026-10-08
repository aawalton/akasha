import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theScarlettLetter = {
  id: "019db533-f39d-7577-8bd0-1e32c0fb918c",
  type: "page-type/book",
  slug: "the-scarlett-letter",
  title: "The Scarlett Letter",
  status: "not-started",
  author: "Nathaniel Hawthorne",
  unit: "unit/words",
  position: 7,
  ownLength: 72750,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
