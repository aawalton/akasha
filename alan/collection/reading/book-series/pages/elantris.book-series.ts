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
  createdAt: "2026-04-22T12:39:34.043Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
