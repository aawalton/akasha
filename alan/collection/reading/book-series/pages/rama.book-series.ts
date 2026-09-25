import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const rama = {
  id: "019db533-f39b-7490-b6f6-8dfd49b74b62",
  type: "page-type/book-series",
  slug: "rama",
  title: "Rama",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B074CFVLTD",
      externalLink: "https://www.amazon.com/dp/B074CFVLTD",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
