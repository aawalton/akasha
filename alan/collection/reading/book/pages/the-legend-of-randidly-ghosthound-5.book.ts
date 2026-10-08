import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theLegendOfRandidlyGhosthound5 = {
  id: "019db533-f391-79d2-b0ae-57fea5a4646e",
  type: "page-type/book",
  slug: "the-legend-of-randidly-ghosthound-5",
  title: "The Legend of Randidly Ghosthound 5",
  status: "completed",
  unit: "unit/words",
  position: 5,
  ownLength: 182500,
  ownProgress: 182500,
  publishedAt: "2023-08-09",
  partOfCollections: ["book-series/the-legend-of-randidly-ghosthound"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0C34H43ST",
      externalLink: "https://amazon.com/dp/B0C34H43ST",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
