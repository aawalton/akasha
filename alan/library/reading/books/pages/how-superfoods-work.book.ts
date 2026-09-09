import type { Book } from "../book.page-type.ts"

export const howSuperfoodsWork = {
  id: "019db533-f39e-71d5-90be-16597d28d7bb",
  pageTypeSlug: "book",
  type: "book",
  slug: "how-superfoods-work",
  title: "How Superfoods Work",
  status: "not-started",
  author: "Julie Neville",
  unit: "words",
  ownLength: 48450,
} as const satisfies Book
