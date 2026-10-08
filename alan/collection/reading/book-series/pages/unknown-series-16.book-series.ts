import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const unknownSeries16 = {
  id: "019db533-f38a-7435-b038-4945c32902c7",
  type: "page-type/book-series",
  slug: "unknown-series-16",
  title: "Unknown Series",
  status: "following",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CHXVBQWY",
      externalLink: "https://www.amazon.com/The-Lost-Edge/dp/B0CHXVBQWY",
      lastSyncedAt: "2025-12-23",
    },
  ],
  createdAt: "2026-04-22T12:39:34.026Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
