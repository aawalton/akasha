import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const truman = {
  id: "019db533-f39d-7557-bcf8-12d23c0c0006",
  type: "page-type/book",
  slug: "truman",
  title: "Truman",
  status: "completed",
  grade: "B",
  author: "David McCullough",
  unit: "unit/words",
  position: 3,
  ownLength: 248000,
  ownProgress: 248000,
} as const satisfies Book
