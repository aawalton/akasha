import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const roadToMastery3 = {
  id: "019db533-f391-750d-a6d1-2aa3d2ab69c6",
  type: "page-type/book",
  slug: "road-to-mastery-3",
  title: "Road to Mastery 3",
  status: "completed",
  author: "Wallace D. Wattles, Ruth L Miller, Patricia J. Crane, Rick Nichols",
  unit: "unit/words",
  position: 3,
  ownLength: 160500,
  ownProgress: 160500,
  publishedAt: "2024-01-30",
  partOfCollections: ["book-series/road-to-mastery"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CFW1XHHP",
      externalLink: "https://amazon.com/dp/B0CFW1XHHP",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
