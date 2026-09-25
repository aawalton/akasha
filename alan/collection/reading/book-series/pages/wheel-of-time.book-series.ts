import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const wheelOfTime = {
  id: "019db533-f39b-746f-9753-d97ce283aa5b",
  type: "page-type/book-series",
  slug: "wheel-of-time",
  title: "Wheel of Time",
  status: "completed",
  grade: "B",
  unit: "unit/words",
  maturityRating: "PG-13",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07F7MLR2R",
      externalLink: "https://www.amazon.com/dp/B07F7MLR2R",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
