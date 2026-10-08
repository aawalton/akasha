import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const vattaSWar = {
  id: "019db533-f39b-740c-b1a9-9cedde66a51d",
  type: "page-type/book-series",
  slug: "vatta-s-war",
  title: "Vatta's War",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B074CF78HK",
      externalLink: "https://www.amazon.com/dp/B074CF78HK",
      lastSyncedAt: "2025-10-14",
    },
  ],
  createdAt: "2026-04-22T12:39:34.043Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
