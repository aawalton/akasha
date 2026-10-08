import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theLegendOfRandidlyGhosthound10 = {
  id: "019db533-f391-7996-92fa-e0dbeac9fafe",
  type: "page-type/book",
  slug: "the-legend-of-randidly-ghosthound-10",
  title: "The Legend of Randidly Ghosthound 10",
  status: "completed",
  unit: "unit/words",
  position: 10,
  ownLength: 235500,
  ownProgress: 235500,
  publishedAt: "2025-01-22",
  partOfCollections: ["book-series/the-legend-of-randidly-ghosthound"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DHW7RZ8X",
      externalLink: "https://amazon.com/dp/B0DHW7RZ8X",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
