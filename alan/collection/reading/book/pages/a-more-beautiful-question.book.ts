import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const aMoreBeautifulQuestion = {
  id: "019db533-f39e-714a-84a9-bc7854b75b11",
  type: "page-type/book",
  slug: "a-more-beautiful-question",
  title: "A More Beautiful Question",
  status: "not-started",
  author: "Warren Berger",
  unit: "unit/words",
  ownLength: 131250,
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
