import type { Book } from "../book.page-type.types.ts"

export const quiet = {
  id: "019db533-f39d-7fbd-a979-307a76449a13",
  pageTypeSlug: "book",
  type: "book",
  slug: "quiet",
  title: "Quiet",
  status: "not-started",
  author: "Susan Cain",
  unit: "words",
  ownLength: 159750,
} as const satisfies Book
