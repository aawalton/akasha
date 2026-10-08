import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const honorHarrington = {
  id: "019db533-f39b-75a0-953a-f17d5cc9c92c",
  type: "page-type/book-series",
  slug: "honor-harrington",
  title: "Honor Harrington",
  status: "paused",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B074C161MH",
      externalLink: "https://www.amazon.com/dp/B074C161MH",
      lastSyncedAt: "2025-10-14",
    },
  ],
  createdAt: "2026-04-22T12:39:34.043Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
