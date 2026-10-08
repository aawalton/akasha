import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const evenAsIAm = {
  id: "019db533-f39d-71a9-9368-7ac8169fd43a",
  type: "page-type/book",
  slug: "even-as-i-am",
  title: "Even As I Am",
  status: "completed",
  grade: "C",
  author: "Neal A. Maxwell",
  unit: "unit/words",
  position: 2,
  ownLength: 30500,
  ownProgress: 30500,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
