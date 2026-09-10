import type { Book } from "../book.page-type.types.ts"

export const decisive = {
  id: "019db533-f39e-720d-8e3a-3407012b770f",
  pageTypeSlug: "book",
  type: "book",
  slug: "decisive",
  title: "Decisive",
  status: "not-started",
  author: "Janet Dailey",
  unit: "words",
  ownLength: 137250,
} as const satisfies Book
