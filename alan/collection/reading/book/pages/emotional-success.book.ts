import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const emotionalSuccess = {
  id: "019db533-f39e-719e-8a8e-c622a20a6456",
  type: "page-type/book",
  slug: "emotional-success",
  title: "Emotional Success",
  status: "not-started",
  author: "David DeSteno",
  unit: "unit/words",
  ownLength: 110550,
} as const satisfies Book
