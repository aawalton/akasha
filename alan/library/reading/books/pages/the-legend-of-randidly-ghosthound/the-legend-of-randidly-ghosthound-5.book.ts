import type { Book } from "../../book.page-type.ts"

export const theLegendOfRandidlyGhosthound5 = {
  id: "019db533-f391-79d2-b0ae-57fea5a4646e",
  pageTypeSlug: "book",
  slug: "the-legend-of-randidly-ghosthound-5",
  title: "The Legend of Randidly Ghosthound 5",
  kind: "read",
  status: "completed",
  unitSlug: "words",
  position: 5,
  ownLength: 182500,
  ownProgress: 182500,
  publishedAt: "2023-08-09",
  partOfSlugs: ["book-series/the-legend-of-randidly-ghosthound"],
  source: "kindle",
  externalId: "B0C34H43ST",
  externalLink: "https://amazon.com/dp/B0C34H43ST",
} as const satisfies Book
