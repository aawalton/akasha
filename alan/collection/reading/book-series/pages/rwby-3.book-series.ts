import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const rwby3 = {
  id: "019db533-f38b-71fe-a435-d7ebeb675997",
  type: "page-type/book-series",
  slug: "rwby-3",
  title: "RWBY",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0856X7L67",
      externalLink: "https://www.amazon.com/dp/B0856X7L67",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
