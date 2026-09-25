import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theAmericanRepublicPrimarySources = {
  id: "019db533-f39d-790d-854e-a9d5151efa91",
  type: "page-type/book",
  slug: "the-american-republic-primary-sources",
  title: "The American Republic: Primary Sources",
  status: "paused",
  author: "Bruce Frohnen",
  unit: "unit/words",
  position: 3,
  ownLength: 180250,
  ownProgress: 2000,
} as const satisfies Book
