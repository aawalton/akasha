import type { Book } from "../../book.page-type.ts"

export const thatYeMayBelieve = {
  id: "019db533-f39d-726c-808b-b49039cd1d3c",
  pageTypeSlug: "book",
  slug: "that-ye-may-believe",
  title: "That Ye May Believe",
  kind: "read",
  status: "completed",
  rank: "C",
  author: "David Keppel",
  unitSlug: "words",
  position: 1,
  ownLength: 28000,
  ownProgress: 28000,
} as const satisfies Book
