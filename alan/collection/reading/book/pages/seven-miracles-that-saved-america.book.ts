import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const sevenMiraclesThatSavedAmerica = {
  id: "019db533-f39d-7a62-aec7-f5856d83bf7e",
  type: "page-type/book",
  slug: "seven-miracles-that-saved-america",
  title: "Seven Miracles that Saved America",
  status: "not-started",
  author: "Chris Stewart, Ted Stewart",
  unit: "unit/words",
  position: 6,
  ownLength: 73500,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
