import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theLegendOfRandidlyGhosthound11 = {
  id: "019db533-f391-798e-8a24-68f6bd390d64",
  type: "page-type/book",
  slug: "the-legend-of-randidly-ghosthound-11",
  title: "The Legend of Randidly Ghosthound 11",
  status: "completed",
  unit: "unit/words",
  position: 11,
  ownLength: 192000,
  ownProgress: 192000,
  publishedAt: "2025-05-21",
  partOfCollections: ["book-series/the-legend-of-randidly-ghosthound"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DT4WVCMS",
      externalLink: "https://amazon.com/dp/B0DT4WVCMS",
    },
  ],
} as const satisfies Book
