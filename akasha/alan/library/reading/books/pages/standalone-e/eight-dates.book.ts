import type { Book } from "../../book.page-type.ts"

export const eightDates = {
  id: "019db533-f38a-7219-b1a0-88721d2b2e94",
  pageTypeSlug: "book",
  slug: "eight-dates",
  title: "Eight Dates",
  kind: "read",
  status: "not-started",
  author: "John Mordechai Gottman, Julie Schwartz Gottman, Doug Abrams, Rachel Carlton Abrams M.D.",
  unitSlug: "words",
  ownLength: 77250,
  publishedAt: "2019-12-03",
} as const satisfies Book
