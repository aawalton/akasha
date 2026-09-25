import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const butForASmallMoment = {
  id: "019db533-f39d-73bc-b2ab-6637aef9bb2e",
  type: "page-type/book",
  slug: "but-for-a-small-moment",
  title: "But For A Small Moment",
  status: "completed",
  grade: "C",
  author: "Neal A. Maxwell",
  unit: "unit/words",
  position: 1,
  ownLength: 33250,
  ownProgress: 33250,
} as const satisfies Book
