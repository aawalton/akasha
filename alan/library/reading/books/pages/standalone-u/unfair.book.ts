import type { Book } from "../../book.page-type.ts"

export const unfair = {
  id: "019db533-f39d-7eb7-bb2a-24f25e2fa5b3",
  pageTypeSlug: "book",
  slug: "unfair",
  title: "Unfair",
  kind: "read",
  status: "not-started",
  author: "Adam Benforado",
  unitSlug: "words",
  ownLength: 150750,
} as const satisfies Book
