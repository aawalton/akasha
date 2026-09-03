import type { Book } from "../../book.page-type.ts"

export const dare = {
  id: "019db533-f39e-7235-812f-a647d9d0df34",
  pageTypeSlug: "book",
  slug: "dare",
  title: "Dare",
  kind: "read",
  status: "not-started",
  author: "Robert Lawrence Stine",
  unitSlug: "words",
  ownLength: 94800,
} as const satisfies Book
