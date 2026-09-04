import type { Book } from "../../book.page-type.ts"

export const outliers = {
  id: "019db533-f39e-708e-90a6-8d6b632de26e",
  pageTypeSlug: "book",
  slug: "outliers",
  title: "Outliers",
  status: "not-started",
  author: "Malcolm Gladwell",
  unitSlug: "words",
  ownLength: 109500,
} as const satisfies Book
