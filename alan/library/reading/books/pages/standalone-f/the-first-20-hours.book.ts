import type { Book } from "../../book.page-type.ts"

export const theFirst20Hours = {
  id: "019db533-f39d-7ebf-90da-a3fd54503f0d",
  pageTypeSlug: "book",
  slug: "the-first-20-hours",
  title: "The First 20 Hours",
  kind: "read",
  status: "not-started",
  author: "Josh Kaufman",
  unitSlug: "words",
  ownLength: 109200,
} as const satisfies Book
