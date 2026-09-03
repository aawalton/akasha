import type { Book } from "../../book.page-type.ts"

export const theScarlettLetter = {
  id: "019db533-f39d-7577-8bd0-1e32c0fb918c",
  pageTypeSlug: "book",
  slug: "the-scarlett-letter",
  title: "The Scarlett Letter",
  kind: "read",
  status: "not-started",
  author: "Nathaniel Hawthorne",
  unitSlug: "words",
  position: 7,
  ownLength: 72750,
} as const satisfies Book
