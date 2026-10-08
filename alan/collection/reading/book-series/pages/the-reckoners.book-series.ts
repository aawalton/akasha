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
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
