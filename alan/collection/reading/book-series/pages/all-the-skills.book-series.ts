import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const allTheSkills = {
  id: "019db533-f38b-7918-b851-8dda6744a467",
  type: "page-type/book-series",
  slug: "all-the-skills",
  title: "All The Skills",
  status: "following",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CHXGPPG4",
      externalLink: "https://www.amazon.com/dp/B0CHXGPPG4",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
