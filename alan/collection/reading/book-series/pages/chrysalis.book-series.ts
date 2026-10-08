import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const chrysalis = {
  id: "019db533-f38b-7882-9339-5ceca070c339",
  type: "page-type/book-series",
  slug: "chrysalis",
  title: "Chrysalis",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0B2CM6GXM",
      externalLink: "https://www.amazon.com/dp/B0B2CM6GXM",
      lastSyncedAt: "2025-10-14",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
