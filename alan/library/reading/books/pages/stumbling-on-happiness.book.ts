import type { Book } from "../book.page-type.ts"

export const stumblingOnHappiness = {
  id: "019db533-f39d-7fae-bb57-60d831ec40f8",
  pageTypeSlug: "book",
  type: "book",
  slug: "stumbling-on-happiness",
  title: "Stumbling on Happiness",
  status: "not-started",
  author: "Daniel Todd Gilbert",
  unit: "words",
  ownLength: 111450,
} as const satisfies Book
