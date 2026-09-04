import type { Book } from "../../book.page-type.ts"

export const aTimeToChoose = {
  id: "019db533-f39d-739d-b886-3f628b90a862",
  pageTypeSlug: "book",
  slug: "a-time-to-choose",
  title: "A Time to Choose",
  status: "completed",
  rank: "C",
  author: "Richard Parker",
  unitSlug: "words",
  position: 4,
  ownLength: 22250,
  ownProgress: 22250,
} as const satisfies Book
