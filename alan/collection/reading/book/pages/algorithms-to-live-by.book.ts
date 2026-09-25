import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const algorithmsToLiveBy = {
  id: "019db533-f39e-71ad-8cce-b0cc7be996f5",
  type: "page-type/book",
  slug: "algorithms-to-live-by",
  title: "Algorithms to Live By",
  status: "not-started",
  author: "Brian Christian, Tom Griffiths, Brian Christian",
  unit: "unit/words",
  ownLength: 177450,
} as const satisfies Book
