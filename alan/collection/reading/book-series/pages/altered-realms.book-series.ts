import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const alteredRealms = {
  id: "019db533-f38b-7907-af4c-40686b3493d2",
  type: "page-type/book-series",
  slug: "altered-realms",
  title: "Altered Realms",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0881H29XP",
      externalLink: "https://www.amazon.com/dp/B0881H29XP",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
