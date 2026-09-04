import type { Book } from "../../book.page-type.ts"

export const orphanStar = {
  id: "019db533-f399-7b0a-8893-7a1e6735d4b2",
  pageTypeSlug: "book",
  slug: "orphan-star",
  title: "Orphan Star",
  status: "not-started",
  author: "Alan Dean Foster",
  unitSlug: "words",
  position: 3,
} as const satisfies Book
