import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const darkOne = {
  id: "019db533-f39d-70bb-995c-aabc3b6a2bf8",
  type: "page-type/book",
  slug: "dark-one",
  title: "Dark One",
  status: "not-started",
  author: "Michelle McNamara",
  unit: "unit/words",
  position: 1,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
