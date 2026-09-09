import type { Book } from "../../book.page-type.ts"

export const brainRules = {
  id: "019db533-f39e-715a-8daf-30f7e04dc639",
  pageTypeSlug: "book",
  type: "book",
  slug: "brain-rules",
  title: "Brain Rules",
  status: "not-started",
  author: "John Medina",
  unit: "words",
  ownLength: 115050,
} as const satisfies Book
