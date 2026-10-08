import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const theExpanse2 = {
  id: "019db533-f39b-7335-a849-750f1358b8f0",
  type: "page-type/book-series",
  slug: "the-expanse-2",
  title: "The Expanse",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09DD17H3N",
      externalLink: "https://www.amazon.com/dp/B09DD17H3N",
      lastSyncedAt: "2025-10-14",
    },
  ],
  createdAt: "2026-04-22T12:39:34.043Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
