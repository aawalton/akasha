import type { Book } from "../../book.page-type.ts"

export const range = {
  id: "019db533-f39d-7f8a-9d07-9bdd6d3a47db",
  pageTypeSlug: "book",
  slug: "range",
  title: "Range",
  kind: "read",
  status: "not-started",
  author: "David J. Epstein",
  unitSlug: "words",
  ownLength: 161550,
} as const satisfies Book
