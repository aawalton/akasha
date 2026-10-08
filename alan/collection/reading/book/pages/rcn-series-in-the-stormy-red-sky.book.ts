import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const rcnSeriesInTheStormyRedSky = {
  id: "019db533-f39a-7ffa-874e-3eaa74387831",
  type: "page-type/book",
  slug: "rcn-series-in-the-stormy-red-sky",
  title: "RCN Series: In the Stormy Red Sky",
  status: "not-started",
  unit: "unit/words",
  position: 6,
  ownLength: 120500,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B00APAHZY4",
      externalLink: "https://www.amazon.com/dp/B00APAHZY4",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
