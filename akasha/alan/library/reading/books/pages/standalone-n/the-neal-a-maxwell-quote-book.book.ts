import type { Book } from "../../book.page-type.ts"

export const theNealAMaxwellQuoteBook = {
  id: "019db533-f39d-704e-8c73-90ca0c5a1e23",
  pageTypeSlug: "book",
  slug: "the-neal-a-maxwell-quote-book",
  title: "The Neal A. Maxwell Quote Book",
  kind: "read",
  status: "completed",
  rank: "C",
  author: "Neal A. Maxwell",
  unitSlug: "words",
  position: 2,
  ownLength: 92750,
  ownProgress: 92750,
} as const satisfies Book
