import type { Book } from "../../book.page-type.ts"

export const quiet = {
  id: "019db533-f39d-7fbd-a979-307a76449a13",
  pageTypeSlug: "book",
  slug: "quiet",
  title: "Quiet",
  kind: "read",
  status: "not-started",
  author: "Susan Cain",
  unitSlug: "words",
  ownLength: 159750,
} as const satisfies Book
