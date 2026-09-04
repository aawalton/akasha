import type { Book } from "../../book.page-type.ts"

export const evenAsIAm = {
  id: "019db533-f39d-71a9-9368-7ac8169fd43a",
  pageTypeSlug: "book",
  slug: "even-as-i-am",
  title: "Even As I Am",
  status: "completed",
  rank: "C",
  author: "Neal A. Maxwell",
  unitSlug: "words",
  position: 2,
  ownLength: 30500,
  ownProgress: 30500,
} as const satisfies Book
