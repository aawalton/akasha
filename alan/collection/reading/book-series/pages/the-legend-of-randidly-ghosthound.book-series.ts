import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const theLegendOfRandidlyGhosthound = {
  id: "019db533-f38b-7672-b4e2-c33485fed7b7",
  type: "page-type/book-series",
  slug: "the-legend-of-randidly-ghosthound",
  title: "The Legend of Randidly Ghosthound",
  status: "completed",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09BNYN665",
      externalLink: "https://www.amazon.com/dp/B09BNYN665",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
