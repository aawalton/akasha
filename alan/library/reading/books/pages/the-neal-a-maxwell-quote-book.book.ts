import type { Book } from "../book.page-type.types.ts"

export const theNealAMaxwellQuoteBook = {
  id: "019db533-f39d-704e-8c73-90ca0c5a1e23",
  pageTypeSlug: "book",
  type: "book",
  slug: "the-neal-a-maxwell-quote-book",
  title: "The Neal A. Maxwell Quote Book",
  status: "completed",
  rank: "C",
  author: "Neal A. Maxwell",
  unit: "words",
  position: 2,
  ownLength: 92750,
  ownProgress: 92750,
} as const satisfies Book
