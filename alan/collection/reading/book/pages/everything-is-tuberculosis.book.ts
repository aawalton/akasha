import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const everythingIsTuberculosis = {
  id: "019db533-f39e-71e5-8b0b-c8da4c67bd54",
  type: "page-type/book",
  slug: "everything-is-tuberculosis",
  title: "Everything is Tuberculosis",
  status: "completed",
  grade: "B",
  author: "John Green",
  unit: "unit/words",
  ownLength: 83700,
  ownProgress: 83700,
} as const satisfies Book
