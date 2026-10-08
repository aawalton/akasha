import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const awakenOnlineRetribution = {
  id: "019db533-f390-789c-a570-e6fe21bdb2f0",
  type: "page-type/book",
  slug: "awaken-online-retribution",
  title: "Awaken Online: Retribution",
  status: "completed",
  author: "Travis Bagwell",
  unit: "unit/words",
  position: 3,
  ownLength: 69250,
  ownProgress: 69250,
  publishedAt: "2017-10-31",
  partOfCollections: ["book-series/awaken-online"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B076P2TND4",
      externalLink: "https://amazon.com/dp/B076P2TND4",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
