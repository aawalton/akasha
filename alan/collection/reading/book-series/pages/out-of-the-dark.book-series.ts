import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const outOfTheDark = {
  id: "019db533-f39b-7550-8d23-1266029342c7",
  type: "page-type/book-series",
  slug: "out-of-the-dark",
  title: "Out of the Dark",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B08BTJBGQ4",
      externalLink: "https://www.amazon.com/dp/B08BTJBGQ4",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
