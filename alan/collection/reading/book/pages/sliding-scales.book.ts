import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const slidingScales = {
  id: "019db533-f399-7a8a-b57c-c88ab46e4666",
  type: "page-type/book",
  slug: "sliding-scales",
  title: "Sliding Scales",
  status: "not-started",
  author: "Alan Dean Foster",
  unit: "unit/words",
  position: 10,
} as const satisfies Book
