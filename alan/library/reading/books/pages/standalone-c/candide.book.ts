import type { Book } from "../../book.page-type.ts"

export const candide = {
  id: "019db533-f39d-7bbd-87c1-a946aad1a20b",
  pageTypeSlug: "book",
  slug: "candide",
  title: "Candide",
  status: "not-started",
  author: "Voltaire",
  unitSlug: "words",
  position: 3,
  ownLength: 32750,
} as const satisfies Book
