import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const teachingsOfLorenzoSnow = {
  id: "019db533-f39d-7837-a61c-64f94b6093ea",
  type: "page-type/book",
  slug: "teachings-of-lorenzo-snow",
  title: "Teachings of Lorenzo Snow",
  status: "not-started",
  author: "Lorenzo Snow",
  unit: "unit/words",
  position: 6,
  ownLength: 49000,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
