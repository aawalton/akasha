import type { Book } from "../../book.page-type.ts"

export const thePrimalHunter11 = {
  id: "019db533-f391-7a37-95b0-b31cc366e237",
  pageTypeSlug: "book",
  slug: "the-primal-hunter-11",
  title: "The Primal Hunter 11",
  status: "completed",
  author: "Zogarth",
  unitSlug: "words",
  position: 11,
  ownLength: 180500,
  ownProgress: 180500,
  publishedAt: "2024-11-26",
  partOfSlugs: ["book-series/the-primal-hunter"],
  source: "kindle",
  externalId: "B0DBRPF2JB",
  externalLink: "https://amazon.com/dp/B0DBRPF2JB",
} as const satisfies Book
