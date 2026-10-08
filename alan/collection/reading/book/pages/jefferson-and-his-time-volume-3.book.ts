import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const jeffersonAndHisTimeVolume3 = {
  id: "019db533-f39d-744b-8003-a8fc32e1dbe0",
  type: "page-type/book",
  slug: "jefferson-and-his-time-volume-3",
  title: "Jefferson & His Time Volume 3",
  status: "not-started",
  author: "Dumas Malone",
  unit: "unit/words",
  position: 3,
  ownLength: 132500,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
