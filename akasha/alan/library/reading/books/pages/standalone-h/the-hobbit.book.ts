import type { Book } from "../../book.page-type.ts"

export const theHobbit = {
  id: "019db533-f38a-7e89-a09e-98dea9b2e539",
  pageTypeSlug: "book",
  slug: "the-hobbit",
  title: "The Hobbit",
  kind: "read",
  status: "completed",
  rank: "A",
  author: "J.R.R. Tolkien",
  unitSlug: "words",
  position: 1,
  publishedAt: "1937-09-21",
} as const satisfies Book
