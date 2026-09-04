import type { BookSeries } from "../book-series.page-type.ts"

export const harryPotter2 = {
  id: "019db533-f38b-7564-9abe-196e54480b74",
  pageTypeSlug: "book-series",
  slug: "harry-potter-2",
  title: "Harry Potter",
  status: "completed",
  rank: "B",
  unitSlug: "words",
  position: 1,
  maturityRating: "PG-13",
  source: "kindle",
  externalId: "B074BYZBPD",
  externalLink: "https://www.amazon.com/Harry-Potter-7-book-series/dp/B074BYZBPD",
  lastSyncedAt: "2025-10-14",
} as const satisfies BookSeries
