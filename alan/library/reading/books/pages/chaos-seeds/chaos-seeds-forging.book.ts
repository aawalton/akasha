import type { Book } from "../../book.page-type.ts"

export const chaosSeedsForging = {
  id: "019db533-f390-7a9c-9fe2-5810a3646599",
  pageTypeSlug: "book",
  slug: "chaos-seeds-forging",
  title: "Chaos Seeds: Forging",
  kind: "read",
  status: "completed",
  rank: "B",
  author: "Aleron Kong",
  unitSlug: "words",
  position: 2,
  ownLength: 129000,
  ownProgress: 129000,
  publishedAt: "2016-01-18",
  partOfSlugs: ["book-series/chaos-seeds"],
  source: "kindle",
  externalId: "B01ATAN9G2",
  externalLink: "https://amazon.com/dp/B01ATAN9G2",
} as const satisfies Book
