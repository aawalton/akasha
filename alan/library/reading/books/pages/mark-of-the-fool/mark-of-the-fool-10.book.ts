import type { Book } from "../../book.page-type.ts"

export const markOfTheFool10 = {
  id: "019db533-f391-720c-acc4-8fe4c69d1950",
  pageTypeSlug: "book",
  slug: "mark-of-the-fool-10",
  title: "Mark of the Fool 10",
  kind: "read",
  status: "completed",
  author: "J.M. Clarke",
  unitSlug: "words",
  position: 10,
  ownLength: 240750,
  ownProgress: 240750,
  publishedAt: "2025-07-30",
  partOfSlugs: ["book-series/mark-of-the-fool"],
  source: "kindle",
  externalId: "B0DQVG53GL",
  externalLink: "https://amazon.com/dp/B0DQVG53GL",
} as const satisfies Book
