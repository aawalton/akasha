import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theSmallestPart = {
  id: "019db533-f39c-7f7b-85b2-deacc933160c",
  type: "page-type/book",
  slug: "the-smallest-part",
  title: "The Smallest Part",
  status: "completed",
  grade: "C",
  author: "Amy Harmon",
  unit: "unit/words",
  position: 1,
  ownLength: 19500,
  ownProgress: 19500,
} as const satisfies Book
