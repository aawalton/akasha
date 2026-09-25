import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const theReckoners = {
  id: "019db533-f39d-73b4-84ba-78fb3bb045db",
  type: "page-type/book-series",
  slug: "the-reckoners",
  title: "The Reckoners",
  status: "paused",
  unit: "unit/words",
  position: 2,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09C1YZTSV",
      externalLink: "https://www.amazon.com/dp/B09C1YZTSV",
      lastSyncedAt: "2025-10-15",
    },
  ],
} as const satisfies BookSeries
