import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const unknownSeries8 = {
  id: "019db533-f38b-76a0-a008-65dc1c61fd87",
  type: "page-type/book-series",
  slug: "unknown-series-8",
  title: "Unknown Series",
  status: "following",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B078MPQVG6",
      externalLink: "https://www.amazon.com/dp/B078MPQVG6",
      lastSyncedAt: "2025-10-14",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
