import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const jeffersonAndHisTimeVolume5 = {
  id: "019db533-f39d-7519-b2ae-ffa7f78b1164",
  type: "page-type/book",
  slug: "jefferson-and-his-time-volume-5",
  title: "Jefferson & His Time Volume 5",
  status: "not-started",
  author: "Dumas Malone",
  unit: "unit/words",
  position: 5,
  ownLength: 167000,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
