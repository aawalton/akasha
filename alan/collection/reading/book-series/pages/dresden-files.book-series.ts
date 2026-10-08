import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const dresdenFiles = {
  id: "019db533-f39b-74e8-9d27-19168b09e002",
  type: "page-type/book-series",
  slug: "dresden-files",
  title: "Dresden Files",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B074CF4JMZ",
      externalLink: "https://www.amazon.com/dp/B074CF4JMZ",
      lastSyncedAt: "2025-10-14",
    },
  ],
  createdAt: "2026-04-22T12:39:34.043Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
