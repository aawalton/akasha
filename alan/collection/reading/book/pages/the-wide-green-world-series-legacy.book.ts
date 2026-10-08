import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theWideGreenWorldSeriesLegacy = {
  id: "019db533-f39a-7f0d-99e7-1002371f4af6",
  type: "page-type/book",
  slug: "the-wide-green-world-series-legacy",
  title: "The Wide Green World Series: Legacy",
  status: "not-started",
  author: "Bible",
  unit: "unit/words",
  position: 1,
  ownLength: 92250,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000SCHBV6",
      externalLink: "https://www.amazon.com/dp/B000SCHBV6",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
