import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const bobiverse = {
  id: "019db533-f39b-7538-9749-02e9370ed104",
  type: "page-type/book-series",
  slug: "bobiverse",
  title: "Bobiverse",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0753LBFQ7",
      externalLink: "https://www.amazon.com/dp/B0753LBFQ7",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
