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
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
