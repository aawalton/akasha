import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theIntrovertAdvantage = {
  id: "019db533-f39d-7f3d-b0b0-7ee023e80d05",
  type: "page-type/book",
  slug: "the-introvert-advantage",
  title: "The Introvert Advantage",
  status: "not-started",
  author: "Marti Olsen Laney",
  unit: "unit/words",
  ownLength: 156300,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
