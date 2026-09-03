import type { Book } from "../../book.page-type.ts"

export const love20 = {
  id: "019db533-f39e-7051-85cb-cea86332dda0",
  pageTypeSlug: "book",
  slug: "love-2-0",
  title: "Love 2.0",
  kind: "read",
  status: "not-started",
  author: "Barbara Fredrickson",
  unitSlug: "words",
  ownLength: 116700,
} as const satisfies Book
