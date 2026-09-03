import type { Book } from "../../book.page-type.ts"

export const decisive = {
  id: "019db533-f39e-720d-8e3a-3407012b770f",
  pageTypeSlug: "book",
  slug: "decisive",
  title: "Decisive",
  kind: "read",
  status: "not-started",
  author: "Janet Dailey",
  unitSlug: "words",
  ownLength: 137250,
} as const satisfies Book
