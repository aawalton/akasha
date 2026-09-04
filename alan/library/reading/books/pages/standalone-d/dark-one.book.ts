import type { Book } from "../../book.page-type.ts"

export const darkOne = {
  id: "019db533-f39d-70bb-995c-aabc3b6a2bf8",
  pageTypeSlug: "book",
  slug: "dark-one",
  title: "Dark One",
  kind: "read",
  status: "not-started",
  author: "Michelle McNamara",
  unitSlug: "words",
  position: 1,
} as const satisfies Book
