import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const theCompletionistChronicles = {
  id: "019db533-f38b-7698-85c2-d9a4c89f6c73",
  type: "page-type/book-series",
  slug: "the-completionist-chronicles",
  title: "The Completionist Chronicles",
  status: "following",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BFM8RBTM",
      externalLink: "https://www.amazon.com/dp/B0BFM8RBTM",
      lastSyncedAt: "2026-02-23",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
