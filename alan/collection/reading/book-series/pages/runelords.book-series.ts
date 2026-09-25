import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const runelords = {
  id: "019db533-f39b-74c8-a52c-6531b67c8adf",
  type: "page-type/book-series",
  slug: "runelords",
  title: "Runelords",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0841YMSN9",
      externalLink: "https://www.amazon.com/dp/B0841YMSN9",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
