import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const thePromiseOfDiscipleship = {
  id: "019db533-f39d-70a3-bf90-5a956a4fe5ff",
  type: "page-type/book",
  slug: "the-promise-of-discipleship",
  title: "The Promise of Discipleship",
  status: "completed",
  grade: "C",
  author: "Neal A. Maxwell",
  unit: "unit/words",
  position: 1,
  ownLength: 32250,
  ownProgress: 32250,
} as const satisfies Book
