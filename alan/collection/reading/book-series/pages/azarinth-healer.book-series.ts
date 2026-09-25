import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const azarinthHealer = {
  id: "019db533-f38b-78da-8821-0ab9cc836bb9",
  type: "page-type/book-series",
  slug: "azarinth-healer",
  title: "Azarinth Healer",
  status: "completed",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BN9N91J7",
      externalLink: "https://www.amazon.com/dp/B0BN9N91J7",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
