import type { BookSeries } from "../book-series.page-type.ts"

export const spaceOdyssey = {
  id: "019db533-f39b-7456-9b92-d636aacd337a",
  pageTypeSlug: "book-series",
  slug: "space-odyssey",
  title: "Space Odyssey",
  status: "not-started",
  unitSlug: "words",
  source: "kindle",
  externalId: "B08437B8LM",
  externalLink: "https://www.amazon.com/dp/B08437B8LM",
  lastSyncedAt: "2025-10-14",
} as const satisfies BookSeries
