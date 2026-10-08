import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const warGod = {
  id: "019db533-f39b-741d-a6c8-63043b6aa7f9",
  type: "page-type/book-series",
  slug: "war-god",
  title: "War God",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B074CFMFBP",
      externalLink: "https://www.amazon.com/dp/B074CFMFBP",
      lastSyncedAt: "2025-10-14",
    },
  ],
  createdAt: "2026-04-22T12:39:34.043Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
