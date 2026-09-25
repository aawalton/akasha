import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const howSuperfoodsWork = {
  id: "019db533-f39e-71d5-90be-16597d28d7bb",
  type: "page-type/book",
  slug: "how-superfoods-work",
  title: "How Superfoods Work",
  status: "not-started",
  author: "Julie Neville",
  unit: "unit/words",
  ownLength: 48450,
} as const satisfies Book
