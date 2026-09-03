import type { Book } from "../../book.page-type.ts"

export const thingsAsTheyReallyAre = {
  id: "019db533-f39c-7fb2-ba3f-54bda46c231a",
  pageTypeSlug: "book",
  slug: "things-as-they-really-are",
  title: "Things As They Really Are",
  kind: "read",
  status: "completed",
  rank: "C",
  author: "Neal A. Maxwell",
  unitSlug: "words",
  position: 3,
  ownLength: 30250,
  ownProgress: 30250,
} as const satisfies Book
