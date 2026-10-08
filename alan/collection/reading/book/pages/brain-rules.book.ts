import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const brainRules = {
  id: "019db533-f39e-715a-8daf-30f7e04dc639",
  type: "page-type/book",
  slug: "brain-rules",
  title: "Brain Rules",
  status: "not-started",
  author: "John Medina",
  unit: "unit/words",
  ownLength: 115050,
  createdAt: "2026-04-22T12:39:34.046Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
