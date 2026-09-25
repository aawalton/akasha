import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const midFlinx = {
  id: "019db533-f399-7ab5-81f6-8da9f63eaa72",
  type: "page-type/book",
  slug: "mid-flinx",
  title: "Mid-Flinx",
  status: "not-started",
  author: "Alan Dean Foster",
  unit: "unit/words",
  position: 7,
} as const satisfies Book
