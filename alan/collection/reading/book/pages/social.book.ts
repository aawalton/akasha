import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const social = {
  id: "019db533-f39d-7fcd-b036-7279e4e3b885",
  type: "page-type/book",
  slug: "social",
  title: "Social",
  status: "not-started",
  author: "Thelma Lee-Mendoza",
  unit: "unit/words",
  ownLength: 169050,
} as const satisfies Book
