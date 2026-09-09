import type { Book } from "../../book.page-type.ts"

export const troubleMagnet = {
  id: "019db533-f399-7aaa-b30d-556c3298f00a",
  pageTypeSlug: "book",
  type: "book",
  slug: "trouble-magnet",
  title: "Trouble Magnet",
  status: "not-started",
  author: "Alan Dean Foster",
  unit: "words",
  position: 12,
} as const satisfies Book
