import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const outliers = {
  id: "019db533-f39e-708e-90a6-8d6b632de26e",
  type: "page-type/book",
  slug: "outliers",
  title: "Outliers",
  status: "not-started",
  author: "Malcolm Gladwell",
  unit: "unit/words",
  ownLength: 109500,
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
