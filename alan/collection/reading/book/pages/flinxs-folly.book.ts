import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const flinxsFolly = {
  id: "019db533-f399-7ad5-838b-dd719edc6dca",
  type: "page-type/book",
  slug: "flinxs-folly",
  title: "Flinx's Folly",
  status: "not-started",
  author: "Alan Dean Foster",
  unit: "unit/words",
  position: 9,
} as const satisfies Book
