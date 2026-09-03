import type { BookSeries } from "../book-series.page-type.ts"

export const unknownSeries = {
  id: "019db533-f39d-7db9-9583-848792160ec7",
  pageTypeSlug: "book-series",
  slug: "unknown-series",
  title: "Unknown Series",
  status: "following",
  rank: "A",
  unitSlug: "words",
  position: 2,
  maturityRating: "PG",
  source: "kindle",
  externalId: "B077LJWQGP",
  externalLink: "https://www.amazon.com/dp/B077LJWQGP",
  lastSyncedAt: "2025-10-15",
} as const satisfies BookSeries
