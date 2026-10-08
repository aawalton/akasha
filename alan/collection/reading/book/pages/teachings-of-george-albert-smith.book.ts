import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const teachingsOfGeorgeAlbertSmith = {
  id: "019db533-f39d-7961-bc39-7d31984b1c3e",
  type: "page-type/book",
  slug: "teachings-of-george-albert-smith",
  title: "Teachings of George Albert Smith",
  status: "not-started",
  author: "Smith, George Albert",
  unit: "unit/words",
  position: 9,
  ownLength: 49000,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
