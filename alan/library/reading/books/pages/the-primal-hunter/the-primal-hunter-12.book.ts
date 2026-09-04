import type { Book } from "../../book.page-type.ts"

export const thePrimalHunter12 = {
  id: "019db533-f391-7a30-9f1d-2b950679f70c",
  pageTypeSlug: "book",
  slug: "the-primal-hunter-12",
  title: "The Primal Hunter 12",
  status: "completed",
  author: "Zogarth",
  unitSlug: "words",
  position: 12,
  ownLength: 150500,
  ownProgress: 150500,
  publishedAt: "2025-03-26",
  partOfSlugs: ["book-series/the-primal-hunter"],
  source: "kindle",
  externalId: "B0DNFXBTWV",
  externalLink: "https://amazon.com/dp/B0DNFXBTWV",
} as const satisfies Book
