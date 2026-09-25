import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theBurnoutGeneration = {
  id: "019db533-f39d-7f54-86da-4af9be2c8cd9",
  type: "page-type/book",
  slug: "the-burnout-generation",
  title: "The Burnout Generation",
  status: "not-started",
  author: "Anne Helen Petersen",
  unit: "unit/words",
  ownLength: 78750,
} as const satisfies Book
