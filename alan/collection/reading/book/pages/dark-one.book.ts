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
} as const satisfies Book
