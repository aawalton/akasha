import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const peak = {
  id: "019db533-f39d-7fa0-a7a8-b3d678ba6d4a",
  type: "page-type/book",
  slug: "peak",
  title: "Peak",
  status: "not-started",
  author: "Roland Smith",
  unit: "unit/words",
  ownLength: 150000,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
