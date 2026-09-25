import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theLegendOfRandidlyGhosthound6 = {
  id: "019db533-f391-79a7-b388-78c3b04ad881",
  type: "page-type/book",
  slug: "the-legend-of-randidly-ghosthound-6",
  title: "The Legend of Randidly Ghosthound 6",
  status: "completed",
  unit: "unit/words",
  position: 6,
  ownLength: 161500,
  ownProgress: 161500,
  publishedAt: "2023-12-06",
  partOfCollections: ["book-series/the-legend-of-randidly-ghosthound"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CD2Q89WK",
      externalLink: "https://amazon.com/dp/B0CD2Q89WK",
    },
  ],
} as const satisfies Book
