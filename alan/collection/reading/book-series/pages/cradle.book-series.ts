import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const cradle = {
  id: "019db533-f38b-7975-b909-1c7e8b3c3344",
  type: "page-type/book-series",
  slug: "cradle",
  title: "Cradle",
  status: "completed",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0753FP6SP",
      externalLink: "https://www.amazon.com/dp/B0753FP6SP",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
