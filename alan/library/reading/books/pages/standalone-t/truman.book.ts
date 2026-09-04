import type { Book } from "../../book.page-type.ts"

export const truman = {
  id: "019db533-f39d-7557-bcf8-12d23c0c0006",
  pageTypeSlug: "book",
  slug: "truman",
  title: "Truman",
  status: "completed",
  rank: "B",
  author: "David McCullough",
  unitSlug: "words",
  position: 3,
  ownLength: 248000,
  ownProgress: 248000,
} as const satisfies Book
