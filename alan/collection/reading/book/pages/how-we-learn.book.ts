import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const howWeLearn = {
  id: "019db533-f39e-718e-a8a0-70ef884c1ea5",
  type: "page-type/book",
  slug: "how-we-learn",
  title: "How We Learn",
  status: "not-started",
  author: "Benedict Carey",
  unit: "unit/words",
  ownLength: 175500,
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
