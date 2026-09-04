import type { BookSeries } from "../book-series.page-type.ts"

export const theJourneyToTheWestSeries = {
  id: "019db533-f388-7d42-ab1e-606c772470a0",
  pageTypeSlug: "book-series",
  slug: "the-journey-to-the-west-series",
  title: "The Journey to the West Series",
  status: "not-started",
  unitSlug: "words",
  source: "kindle",
  externalId: "B087G3G8GT",
  externalLink: "https://www.amazon.com/dp/B087G3G8GT",
  lastSyncedAt: "2025-12-17",
} as const satisfies BookSeries
