import type { Book } from "../../book.page-type.ts"

export const plainAndPreciousThings = {
  id: "019db533-f39d-722e-a69b-c11c4a44eac5",
  pageTypeSlug: "book",
  slug: "plain-and-precious-things",
  title: "Plain and Precious Things",
  kind: "read",
  status: "completed",
  rank: "C",
  author: "Neal A. Maxwell",
  unitSlug: "words",
  position: 3,
  ownLength: 25000,
  ownProgress: 25000,
} as const satisfies Book
