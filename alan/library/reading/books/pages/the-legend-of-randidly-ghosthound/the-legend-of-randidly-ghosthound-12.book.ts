import type { Book } from "../../book.page-type.ts"

export const theLegendOfRandidlyGhosthound12 = {
  id: "019db533-f391-799f-95f0-fb5138d57aad",
  pageTypeSlug: "book",
  slug: "the-legend-of-randidly-ghosthound-12",
  title: "The Legend of Randidly Ghosthound 12",
  kind: "read",
  status: "completed",
  unitSlug: "words",
  position: 12,
  ownLength: 173000,
  ownProgress: 173000,
  publishedAt: "2025-09-10",
  partOfSlugs: ["book-series/the-legend-of-randidly-ghosthound"],
  source: "kindle",
  externalId: "B0F8L7P413",
  externalLink: "https://amazon.com/dp/B0F8L7P413",
} as const satisfies Book
