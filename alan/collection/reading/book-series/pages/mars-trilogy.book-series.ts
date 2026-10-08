import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const marsTrilogy = {
  id: "019db533-f39b-7508-81a3-0080d5914a47",
  type: "page-type/book-series",
  slug: "mars-trilogy",
  title: "Mars Trilogy",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B075V8LBPP",
      externalLink: "https://www.amazon.com/dp/B075V8LBPP",
      lastSyncedAt: "2025-10-14",
    },
  ],
  createdAt: "2026-04-22T12:39:34.043Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
