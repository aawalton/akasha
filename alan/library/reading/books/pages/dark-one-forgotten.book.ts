import type { Book } from "../book.page-type.types.ts"

export const darkOneForgotten = {
  id: "019db533-f39d-7093-afd2-394f607d45b3",
  pageTypeSlug: "book",
  type: "book",
  slug: "dark-one-forgotten",
  title: "Dark One Forgotten",
  status: "not-started",
  author: "Michelle Reid",
  unit: "words",
  position: 2,
} as const satisfies Book
