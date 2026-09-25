import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const elantris = {
  id: "019db533-f39b-7568-a35a-4ddcc65edd80",
  type: "page-type/book-series",
  slug: "elantris",
  title: "Elantris",
  status: "not-started",
  unit: "unit/words",
  position: 6,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B074CG7212",
      externalLink: "https://www.amazon.com/dp/B074CG7212",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
