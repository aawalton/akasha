import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const sermonsNotSpoken = {
  id: "019db533-f39d-7245-8964-260598dcc7a3",
  type: "page-type/book",
  slug: "sermons-not-spoken",
  title: "Sermons Not Spoken",
  status: "completed",
  grade: "C",
  author: "Neal A. Maxwell",
  unit: "unit/words",
  position: 5,
  ownLength: 24750,
  ownProgress: 24750,
} as const satisfies Book
