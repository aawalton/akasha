import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const whatTheDogSaw = {
  id: "019db533-f39d-7ee8-9e7f-1cc79e04a0b3",
  type: "page-type/book",
  slug: "what-the-dog-saw",
  title: "What the Dog Saw",
  status: "not-started",
  author: "Malcolm Gladwell",
  unit: "unit/words",
  ownLength: 191550,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
