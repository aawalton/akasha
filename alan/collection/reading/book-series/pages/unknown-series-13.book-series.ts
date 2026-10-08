import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const unknownSeries13 = {
  id: "019db533-f38a-74cd-9beb-0877a17f9932",
  type: "page-type/book-series",
  slug: "unknown-series-13",
  title: "Unknown Series",
  status: "following",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CLKW8FLY",
      externalLink: "https://www.amazon.com/dp/B0CLKW8FLY",
      lastSyncedAt: "2025-11-22",
    },
  ],
  createdAt: "2026-04-22T12:39:34.026Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
