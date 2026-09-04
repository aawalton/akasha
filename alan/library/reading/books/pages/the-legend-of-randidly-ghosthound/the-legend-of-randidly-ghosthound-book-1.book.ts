import type { Book } from "../../book.page-type.ts"

export const theLegendOfRandidlyGhosthoundBook1 = {
  id: "019db533-f391-79f3-a6e1-45abefa6e645",
  pageTypeSlug: "book",
  slug: "the-legend-of-randidly-ghosthound-book-1",
  title: "The Legend of Randidly Ghosthound",
  kind: "read",
  status: "completed",
  author: "Noret Flood",
  unitSlug: "words",
  position: 1,
  ownLength: 143500,
  ownProgress: 143500,
  publishedAt: "2021-11-09",
  partOfSlugs: ["book-series/the-legend-of-randidly-ghosthound"],
  source: "kindle",
  externalId: "B09BNSH5KG",
  externalLink: "https://amazon.com/dp/B09BNSH5KG",
} as const satisfies Book
