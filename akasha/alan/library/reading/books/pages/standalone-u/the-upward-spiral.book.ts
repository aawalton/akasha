import type { Book } from "../../book.page-type.ts"

export const theUpwardSpiral = {
  id: "019db533-f39d-7ead-8fe2-7710be503f25",
  pageTypeSlug: "book",
  slug: "the-upward-spiral",
  title: "The Upward Spiral",
  kind: "read",
  status: "not-started",
  author: "Alex Korb PhD, Daniel J. Siegel MD",
  unitSlug: "words",
  ownLength: 83550,
} as const satisfies Book
