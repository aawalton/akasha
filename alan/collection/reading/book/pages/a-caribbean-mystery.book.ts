import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const aCaribbeanMystery = {
  id: "019db533-f399-7b55-851a-9f79e6d78a4c",
  type: "page-type/book",
  slug: "a-caribbean-mystery",
  title: "A Caribbean Mystery",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 10,
  createdAt: "2026-04-22T12:39:34.041Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
