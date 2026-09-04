import type { Book } from "../../book.page-type.ts"

export const theBeginningOfInfinity = {
  id: "019db533-f39d-7895-8192-b57a28454ab9",
  pageTypeSlug: "book",
  slug: "the-beginning-of-infinity",
  title: "The Beginning of Infinity",
  kind: "read",
  status: "not-started",
  author: "David Deutsch",
  unitSlug: "words",
  position: 2,
  ownLength: 114750,
} as const satisfies Book
