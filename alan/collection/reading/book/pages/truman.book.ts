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
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
