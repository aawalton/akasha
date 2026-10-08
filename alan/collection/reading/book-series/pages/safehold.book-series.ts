import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const safehold = {
  id: "019db533-f39b-74d8-b284-e96915727ae7",
  type: "page-type/book-series",
  slug: "safehold",
  title: "Safehold",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B074C72647",
      externalLink: "https://www.amazon.com/dp/B074C72647",
      lastSyncedAt: "2025-10-14",
    },
  ],
  createdAt: "2026-04-22T12:39:34.043Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
