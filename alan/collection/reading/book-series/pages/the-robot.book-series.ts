import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const theRobot = {
  id: "019db533-f39b-7404-b3fb-b5265db1e7d4",
  type: "page-type/book-series",
  slug: "the-robot",
  title: "The Robot",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B088NK26KX",
      externalLink: "https://www.amazon.com/dp/B088NK26KX",
      lastSyncedAt: "2025-10-14",
    },
  ],
  createdAt: "2026-04-22T12:39:34.043Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
