import type { Book } from "../../book.page-type.ts"

export const dreamer = {
  id: "019db533-f39d-7014-93e5-8f7380fd41fd",
  pageTypeSlug: "book",
  slug: "dreamer",
  title: "Dreamer",
  kind: "read",
  status: "completed",
  rank: "B",
  author: "Laini Taylor",
  unitSlug: "words",
  position: 4,
  ownLength: 6500,
  ownProgress: 6500,
} as const satisfies Book
