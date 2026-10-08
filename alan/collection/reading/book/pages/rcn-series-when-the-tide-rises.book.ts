import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const rcnSeriesWhenTheTideRises = {
  id: "019db533-f39a-77f2-9926-487e870901e3",
  type: "page-type/book",
  slug: "rcn-series-when-the-tide-rises",
  title: "RCN Series: When the Tide Rises",
  status: "not-started",
  unit: "unit/words",
  position: 5,
  ownLength: 97750,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B00AP91V0Y",
      externalLink: "https://www.amazon.com/dp/B00AP91V0Y",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
