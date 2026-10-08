import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const rcnSeries = {
  id: "019db533-f39b-74b8-bc24-97849b30f5d4",
  type: "page-type/book-series",
  slug: "rcn-series",
  title: "RCN Series",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B074C723QN",
      externalLink: "https://www.amazon.com/dp/B074C723QN",
      lastSyncedAt: "2025-10-14",
    },
  ],
  createdAt: "2026-04-22T12:39:34.043Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
