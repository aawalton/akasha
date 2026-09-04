import type { Book } from "../../book.page-type.ts"

export const theFellowshipOfTheRing = {
  id: "019db533-f38a-7e22-92aa-fc4d8e6cd85b",
  pageTypeSlug: "book",
  slug: "the-fellowship-of-the-ring",
  title: "The Fellowship of the Ring",
  status: "completed",
  rank: "A",
  author: "J.R.R. Tolkien",
  unitSlug: "words",
  position: 1,
  publishedAt: "1954-07-29",
} as const satisfies Book
