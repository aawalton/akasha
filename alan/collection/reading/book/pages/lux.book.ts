import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const lux = {
  id: "019db533-f39d-7083-ba28-d40487c67720",
  type: "page-type/book",
  slug: "lux",
  title: "Lux",
  status: "not-started",
  author: "Jennifer L. Armentrout",
  unit: "unit/words",
  position: 5,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
