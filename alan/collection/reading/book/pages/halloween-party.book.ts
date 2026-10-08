import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const halloweenParty = {
  id: "019db533-f399-7d55-9367-c86f3e3d323d",
  type: "page-type/book",
  slug: "halloween-party",
  title: "Hallowe'en Party",
  status: "not-started",
  author: "Agatha Christie",
  unit: "unit/words",
  position: 31,
  createdAt: "2026-04-22T12:39:34.041Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
