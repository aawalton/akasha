import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const dreamer = {
  id: "019db533-f39d-7014-93e5-8f7380fd41fd",
  type: "page-type/book",
  slug: "dreamer",
  title: "Dreamer",
  status: "completed",
  grade: "B",
  author: "Laini Taylor",
  unit: "unit/words",
  position: 4,
  ownLength: 6500,
  ownProgress: 6500,
} as const satisfies Book
