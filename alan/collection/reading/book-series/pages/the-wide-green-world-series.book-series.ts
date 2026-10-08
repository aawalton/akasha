import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const theWideGreenWorldSeries = {
  id: "019db533-f39b-745f-81d5-ba2ec3c82bcc",
  type: "page-type/book-series",
  slug: "the-wide-green-world-series",
  title: "The Wide Green World Series",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0841XW4PP",
      externalLink: "https://www.amazon.com/dp/B0841XW4PP",
      lastSyncedAt: "2025-10-14",
    },
  ],
  createdAt: "2026-04-22T12:39:34.043Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
