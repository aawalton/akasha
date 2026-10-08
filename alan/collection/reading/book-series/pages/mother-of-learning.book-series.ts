import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const motherOfLearning = {
  id: "019db533-f38b-77f1-8236-f3def8be7f6b",
  type: "page-type/book-series",
  slug: "mother-of-learning",
  title: "Mother of Learning",
  status: "completed",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CHSJ19J9",
      externalLink: "https://www.amazon.com/dp/B0CHSJ19J9",
      lastSyncedAt: "2025-10-14",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
