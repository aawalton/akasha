import type { Book } from "../../book.page-type.ts"

export const learnedOptimism = {
  id: "019db533-f39d-7fb6-9763-19cb443d0b1e",
  pageTypeSlug: "book",
  slug: "learned-optimism",
  title: "Learned Optimism",
  kind: "read",
  status: "completed",
  rank: "B",
  author: "Martin Elias Pete Seligman",
  unitSlug: "words",
  ownLength: 21000,
  ownProgress: 21000,
} as const satisfies Book
