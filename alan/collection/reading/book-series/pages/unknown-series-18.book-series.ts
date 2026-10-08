import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const unknownSeries18 = {
  id: "019db533-f38a-73b5-8fa9-37beb9a24ad1",
  type: "page-type/book-series",
  slug: "unknown-series-18",
  title: "Unknown Series",
  status: "following",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DGGCBRKD",
      externalLink: "https://www.amazon.com/Grim-Guys/dp/B0DGGCBRKD",
      lastSyncedAt: "2025-11-22",
    },
  ],
  createdAt: "2026-04-22T12:39:34.026Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
