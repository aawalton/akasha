import type { Book } from "../../book.page-type.ts"

export const thePrimalHunter9 = {
  id: "019db533-f391-7a4a-8aaf-a01ef5b4d830",
  pageTypeSlug: "book",
  slug: "the-primal-hunter-9",
  title: "The Primal Hunter 9",
  kind: "read",
  status: "completed",
  author: "Nick Roberts, Greg Kramer",
  unitSlug: "words",
  position: 9,
  ownLength: 151000,
  ownProgress: 151000,
  publishedAt: "2024-05-08",
  partOfSlugs: ["book-series/the-primal-hunter"],
  source: "kindle",
  externalId: "B0CRFV7SNZ",
  externalLink: "https://amazon.com/dp/B0CRFV7SNZ",
} as const satisfies Book
