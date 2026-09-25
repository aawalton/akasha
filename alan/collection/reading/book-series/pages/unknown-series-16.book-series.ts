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
} as const satisfies BookSeries
