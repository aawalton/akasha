import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const sevenMiraclesThatSavedTheWorld = {
  id: "019db533-f39d-79bb-9066-1cde84d1c106",
  type: "page-type/book",
  slug: "seven-miracles-that-saved-the-world",
  title: "Seven Miracles that Saved the World",
  status: "not-started",
  author: "Chris Stewart, Ted Stewart",
  unit: "unit/words",
  position: 7,
  ownLength: 71000,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
