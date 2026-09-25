import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const systemUniverse = {
  id: "019db533-f38b-76a9-8934-c7d179c6f7b3",
  type: "page-type/book-series",
  slug: "system-universe",
  title: "System Universe",
  status: "following",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0B6215Z5F",
      externalLink: "https://www.amazon.com/dp/B0B6215Z5F",
      lastSyncedAt: "2026-02-14",
    },
  ],
} as const satisfies BookSeries
