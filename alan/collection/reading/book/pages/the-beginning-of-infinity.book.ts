import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theBeginningOfInfinity = {
  id: "019db533-f39d-7895-8192-b57a28454ab9",
  type: "page-type/book",
  slug: "the-beginning-of-infinity",
  title: "The Beginning of Infinity",
  status: "not-started",
  author: "David Deutsch",
  unit: "unit/words",
  position: 2,
  ownLength: 114750,
} as const satisfies Book
