import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const manticoreAscendantSeries = {
  id: "019db533-f39b-7500-afaf-3bc624c54c24",
  type: "page-type/book-series",
  slug: "manticore-ascendant-series",
  title: "Manticore Ascendant series",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0C3ZWH6W5",
      externalLink: "https://www.amazon.com/dp/B0C3ZWH6W5",
      lastSyncedAt: "2025-10-14",
    },
  ],
  createdAt: "2026-04-22T12:39:34.043Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
