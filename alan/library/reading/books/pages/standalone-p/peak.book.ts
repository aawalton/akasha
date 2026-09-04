import type { Book } from "../../book.page-type.ts"

export const peak = {
  id: "019db533-f39d-7fa0-a7a8-b3d678ba6d4a",
  pageTypeSlug: "book",
  slug: "peak",
  title: "Peak",
  status: "not-started",
  author: "Roland Smith",
  unitSlug: "words",
  ownLength: 150000,
} as const satisfies Book
