import type { Book } from "../../book.page-type.ts"

export const theLegendOfRandidlyGhosthound3 = {
  id: "019db533-f391-79ea-b894-7d40404fce3c",
  pageTypeSlug: "book",
  slug: "the-legend-of-randidly-ghosthound-3",
  title: "The Legend of Randidly Ghosthound 3",
  kind: "read",
  status: "completed",
  unitSlug: "words",
  position: 3,
  ownLength: 125500,
  ownProgress: 125500,
  publishedAt: "2022-07-19",
  partOfSlugs: ["book-series/the-legend-of-randidly-ghosthound"],
  source: "kindle",
  externalId: "B09S1BR26C",
  externalLink: "https://amazon.com/dp/B09S1BR26C",
} as const satisfies Book
