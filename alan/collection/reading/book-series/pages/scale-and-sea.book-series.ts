import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const scaleAndSea = {
  id: "019db533-f38a-74b8-bee0-2c06506d08c8",
  type: "page-type/book-series",
  slug: "scale-and-sea",
  title: "Scale & Sea",
  status: "completed",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BYMQSCGC",
      externalLink: "https://www.amazon.com/dp/B0BYMQSCGC",
      lastSyncedAt: "2025-11-22",
    },
  ],
} as const satisfies BookSeries
