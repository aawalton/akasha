import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const smartChange = {
  id: "019db533-f39e-70ed-ab0c-5d6de0ba48fd",
  type: "page-type/book",
  slug: "smart-change",
  title: "Smart Change",
  status: "not-started",
  author: "Art Markman  PhD",
  unit: "unit/words",
  ownLength: 112800,
} as const satisfies Book
