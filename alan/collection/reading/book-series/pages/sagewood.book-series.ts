import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const sagewood = {
  id: "019db533-f38b-7796-b2de-2a9ff46b3a3b",
  type: "page-type/book-series",
  slug: "sagewood",
  title: "Sagewood",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0D5J7G9ZN",
      externalLink: "https://www.amazon.com/dp/B0D5J7G9ZN",
      lastSyncedAt: "2025-10-14",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
