import type { Book } from "../../book.page-type.ts"

export const book10Happier = {
  id: "019db533-f39e-7264-83a9-ea35363db5c5",
  pageTypeSlug: "book",
  slug: "book-10-happier",
  title: "10% Happier",
  kind: "read",
  status: "not-started",
  author: "Dan Harris",
  unitSlug: "words",
  ownLength: 117450,
} as const satisfies Book
