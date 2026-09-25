import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theLegendOfRandidlyGhosthound7 = {
  id: "019db533-f391-79ca-aba1-2aea7bb9bcad",
  type: "page-type/book",
  slug: "the-legend-of-randidly-ghosthound-7",
  title: "The Legend of Randidly Ghosthound 7",
  status: "completed",
  unit: "unit/words",
  position: 7,
  ownLength: 171500,
  ownProgress: 171500,
  publishedAt: "2024-03-13",
  partOfCollections: ["book-series/the-legend-of-randidly-ghosthound"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CPB6ZSTS",
      externalLink: "https://amazon.com/dp/B0CPB6ZSTS",
    },
  ],
} as const satisfies Book
