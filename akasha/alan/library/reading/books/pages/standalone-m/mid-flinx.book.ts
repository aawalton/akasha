import type { Book } from "../../book.page-type.ts"

export const midFlinx = {
  id: "019db533-f399-7ab5-81f6-8da9f63eaa72",
  pageTypeSlug: "book",
  slug: "mid-flinx",
  title: "Mid-Flinx",
  kind: "read",
  status: "not-started",
  author: "Alan Dean Foster",
  unitSlug: "words",
  position: 7,
} as const satisfies Book
