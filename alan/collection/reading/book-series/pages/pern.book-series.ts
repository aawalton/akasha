import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const pern = {
  id: "019db533-f39b-7578-87a5-41aa373f34f6",
  type: "page-type/book-series",
  slug: "pern",
  title: "Pern",
  status: "paused",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07XM3RM3J",
      externalLink: "https://www.amazon.com/dp/B07XM3RM3J",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
