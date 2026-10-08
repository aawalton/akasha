import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theFourthTurning = {
  id: "019db533-f39d-78be-b97f-1d72f49d6cd9",
  type: "page-type/book",
  slug: "the-fourth-turning",
  title: "The Fourth Turning",
  status: "not-started",
  author: "William Strauss, Neil Howe",
  unit: "unit/words",
  position: 5,
  ownLength: 83500,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
