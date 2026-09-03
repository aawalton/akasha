import type { BookSeries } from "../book-series.page-type.ts"

export const systemUniverse = {
  id: "019db533-f38b-76a9-8934-c7d179c6f7b3",
  pageTypeSlug: "book-series",
  slug: "system-universe",
  title: "System Universe",
  status: "following",
  unitSlug: "words",
  source: "kindle",
  externalId: "B0B6215Z5F",
  externalLink: "https://www.amazon.com/dp/B0B6215Z5F",
  lastSyncedAt: "2026-02-14",
} as const satisfies BookSeries
