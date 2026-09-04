import type { BookSeries } from "../book-series.page-type.ts"

export const amelia = {
  id: "019db533-f38b-7910-ab72-d12366a6563b",
  pageTypeSlug: "book-series",
  slug: "amelia",
  title: "Amelia",
  status: "not-started",
  unitSlug: "words",
  source: "kindle",
  externalId: "B0C6YLNM8J",
  externalLink: "https://www.amazon.com/dp/B0C6YLNM8J",
  lastSyncedAt: "2025-10-14",
} as const satisfies BookSeries
