import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const decisive = {
  id: "019db533-f39e-720d-8e3a-3407012b770f",
  type: "page-type/book",
  slug: "decisive",
  title: "Decisive",
  status: "not-started",
  author: "Janet Dailey",
  unit: "unit/words",
  ownLength: 137250,
} as const satisfies Book
