import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const unknownSeries7 = {
  id: "019db533-f38b-76b1-85cf-6261318da043",
  type: "page-type/book-series",
  slug: "unknown-series-7",
  title: "Unknown Series",
  status: "following",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B082NVNR8P",
      externalLink: "https://www.amazon.com/dp/B082NVNR8P",
      lastSyncedAt: "2026-01-20",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
