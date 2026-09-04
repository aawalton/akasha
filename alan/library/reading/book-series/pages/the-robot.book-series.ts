import type { BookSeries } from "../book-series.page-type.ts"

export const theRobot = {
  id: "019db533-f39b-7404-b3fb-b5265db1e7d4",
  pageTypeSlug: "book-series",
  slug: "the-robot",
  title: "The Robot",
  status: "not-started",
  unitSlug: "words",
  source: "kindle",
  externalId: "B088NK26KX",
  externalLink: "https://www.amazon.com/dp/B088NK26KX",
  lastSyncedAt: "2025-10-14",
} as const satisfies BookSeries
