import type { BookSeries } from "../book-series.page-type.ts"

export const discworld = {
  id: "019db533-f39a-703a-9d25-6d7c7ee4731b",
  pageTypeSlug: "book-series",
  slug: "discworld",
  title: "Discworld",
  status: "not-started",
  unitSlug: "words",
  source: "kindle",
  externalId: "B07TYGGG76",
  externalLink: "https://www.amazon.com/dp/B07TYGGG76",
  lastSyncedAt: "2025-10-14",
} as const satisfies BookSeries
