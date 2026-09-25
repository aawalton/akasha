import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const trySofter = {
  id: "019db533-f39d-7f25-8122-92d33907d922",
  type: "page-type/book",
  slug: "try-softer",
  title: "Try Softer",
  status: "not-started",
  author: "Aundi Kolber",
  unit: "unit/words",
  ownLength: 89250,
} as const satisfies Book
