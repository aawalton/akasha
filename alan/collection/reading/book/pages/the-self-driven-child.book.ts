import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theSelfDrivenChild = {
  id: "019db533-f39d-7e4f-9bdc-2eb3fc22d382",
  type: "page-type/book",
  slug: "the-self-driven-child",
  title: "The Self-Driven Child",
  status: "not-started",
  author: "William Stixrud PhD, Ned Johnson",
  unit: "unit/words",
  ownLength: 173700,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
