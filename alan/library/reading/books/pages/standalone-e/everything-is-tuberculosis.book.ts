import type { Book } from "../../book.page-type.ts"

export const everythingIsTuberculosis = {
  id: "019db533-f39e-71e5-8b0b-c8da4c67bd54",
  pageTypeSlug: "book",
  slug: "everything-is-tuberculosis",
  title: "Everything is Tuberculosis",
  status: "completed",
  rank: "B",
  author: "John Green",
  unitSlug: "words",
  ownLength: 83700,
  ownProgress: 83700,
} as const satisfies Book
