import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theScienceOfTrust = {
  id: "019db533-f39d-7f6b-9140-56bd69fcd686",
  type: "page-type/book",
  slug: "the-science-of-trust",
  title: "The Science of Trust",
  status: "completed",
  grade: "C",
  author: "John Mordechai Gottman",
  unit: "unit/words",
  ownLength: 246300,
  ownProgress: 246300,
  publishedAt: "2012-04-01",
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
