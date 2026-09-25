import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const unknownSeries2 = {
  id: "019db533-f39b-73fc-8a82-7eec7ca843be",
  type: "page-type/book-series",
  slug: "unknown-series-2",
  title: "Unknown Series",
  status: "following",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B074B5DJ59",
      externalLink: "https://www.amazon.com/dp/B074B5DJ59",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
