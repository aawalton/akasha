import type { BookSeries } from "../book-series.page-type.ts"

export const marsTrilogy = {
  id: "019db533-f39b-7508-81a3-0080d5914a47",
  pageTypeSlug: "book-series",
  slug: "mars-trilogy",
  title: "Mars Trilogy",
  status: "not-started",
  unitSlug: "words",
  source: "kindle",
  externalId: "B075V8LBPP",
  externalLink: "https://www.amazon.com/dp/B075V8LBPP",
  lastSyncedAt: "2025-10-14",
} as const satisfies BookSeries
