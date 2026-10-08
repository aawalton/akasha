import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const oldKingdom = {
  id: "019db533-f39b-7570-878b-eb3d6d2852be",
  type: "page-type/book-series",
  slug: "old-kingdom",
  title: "Old Kingdom",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0841YQ8MP",
      externalLink: "https://www.amazon.com/dp/B0841YQ8MP",
      lastSyncedAt: "2025-10-14",
    },
  ],
  createdAt: "2026-04-22T12:39:34.043Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
