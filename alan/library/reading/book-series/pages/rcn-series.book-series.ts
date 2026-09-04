import type { BookSeries } from "../book-series.page-type.ts"

export const rcnSeries = {
  id: "019db533-f39b-74b8-bc24-97849b30f5d4",
  pageTypeSlug: "book-series",
  slug: "rcn-series",
  title: "RCN Series",
  status: "not-started",
  unitSlug: "words",
  source: "kindle",
  externalId: "B074C723QN",
  externalLink: "https://www.amazon.com/dp/B074C723QN",
  lastSyncedAt: "2025-10-14",
} as const satisfies BookSeries
