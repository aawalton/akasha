import type { BookSeries } from "../book-series.page-type.ts"

export const elantris = {
  id: "019db533-f39b-7568-a35a-4ddcc65edd80",
  pageTypeSlug: "book-series",
  slug: "elantris",
  title: "Elantris",
  status: "not-started",
  unitSlug: "words",
  position: 6,
  source: "kindle",
  externalId: "B074CG7212",
  externalLink: "https://www.amazon.com/dp/B074CG7212",
  lastSyncedAt: "2025-10-14",
} as const satisfies BookSeries
