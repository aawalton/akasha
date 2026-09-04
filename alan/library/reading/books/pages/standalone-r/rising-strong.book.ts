import type { Book } from "../../book.page-type.ts"

export const risingStrong = {
  id: "019db533-f39e-70a5-8188-e07e1feb4ced",
  pageTypeSlug: "book",
  slug: "rising-strong",
  title: "Rising Strong",
  kind: "read",
  status: "not-started",
  author: "Brené Brown",
  unitSlug: "words",
  ownLength: 132750,
} as const satisfies Book
