import type { Book } from "../../book.page-type.ts"

export const flinxsFolly = {
  id: "019db533-f399-7ad5-838b-dd719edc6dca",
  pageTypeSlug: "book",
  slug: "flinxs-folly",
  title: "Flinx's Folly",
  kind: "read",
  status: "not-started",
  author: "Alan Dean Foster",
  unitSlug: "words",
  position: 9,
} as const satisfies Book
