import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const stumblingOnHappiness = {
  id: "019db533-f39d-7fae-bb57-60d831ec40f8",
  type: "page-type/book",
  slug: "stumbling-on-happiness",
  title: "Stumbling on Happiness",
  status: "not-started",
  author: "Daniel Todd Gilbert",
  unit: "unit/words",
  ownLength: 111450,
} as const satisfies Book
