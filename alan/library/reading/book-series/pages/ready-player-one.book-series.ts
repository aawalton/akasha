import type { BookSeries } from "../book-series.page-type.ts"

export const readyPlayerOne = {
  id: "019db533-f38b-77ad-8d2b-4fb5a7d9c86d",
  pageTypeSlug: "book-series",
  slug: "ready-player-one",
  title: "Ready Player One",
  status: "not-started",
  unitSlug: "words",
  source: "kindle",
  externalId: "B083977FTN",
  externalLink: "https://www.amazon.com/dp/B083977FTN",
  lastSyncedAt: "2025-10-14",
} as const satisfies BookSeries
