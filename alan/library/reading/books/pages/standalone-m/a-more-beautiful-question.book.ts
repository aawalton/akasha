import type { Book } from "../../book.page-type.ts"

export const aMoreBeautifulQuestion = {
  id: "019db533-f39e-714a-84a9-bc7854b75b11",
  pageTypeSlug: "book",
  slug: "a-more-beautiful-question",
  title: "A More Beautiful Question",
  status: "not-started",
  author: "Warren Berger",
  unitSlug: "words",
  ownLength: 131250,
} as const satisfies Book
