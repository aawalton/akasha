import type { Book } from "../../book.page-type.ts"

export const trySofter = {
  id: "019db533-f39d-7f25-8122-92d33907d922",
  pageTypeSlug: "book",
  slug: "try-softer",
  title: "Try Softer",
  status: "not-started",
  author: "Aundi Kolber",
  unitSlug: "words",
  ownLength: 89250,
} as const satisfies Book
