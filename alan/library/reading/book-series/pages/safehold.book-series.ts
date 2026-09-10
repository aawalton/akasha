import type { BookSeries } from "../book-series.page-type.types.ts"

export const safehold = {
  id: "019db533-f39b-74d8-b284-e96915727ae7",
  pageTypeSlug: "book-series",
  type: "book-series",
  slug: "safehold",
  title: "Safehold",
  status: "not-started",
  unit: "words",
  source: "kindle",
  externalId: "B074C72647",
  externalLink: "https://www.amazon.com/dp/B074C72647",
  lastSyncedAt: "2025-10-14",
} as const satisfies BookSeries
