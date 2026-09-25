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
} as const satisfies Book
