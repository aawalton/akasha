import type { Book } from "../../book.page-type.ts"

export const thePrimalHunter13 = {
  id: "019db533-f391-7a28-a881-95891bbd85da",
  pageTypeSlug: "book",
  slug: "the-primal-hunter-13",
  title: "The Primal Hunter 13",
  status: "completed",
  author: "Nick Roberts, Greg Kramer",
  unitSlug: "words",
  position: 13,
  ownLength: 151500,
  ownProgress: 151500,
  publishedAt: "2025-07-23",
  partOfSlugs: ["book-series/the-primal-hunter"],
  source: "kindle",
  externalId: "B0F1Z5F7GH",
  externalLink: "https://amazon.com/dp/B0F1Z5F7GH",
} as const satisfies Book
