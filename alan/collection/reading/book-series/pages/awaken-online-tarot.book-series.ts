import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const awakenOnlineTarot = {
  id: "019db533-f38b-78e2-8fc1-3d4a9ec8f788",
  type: "page-type/book-series",
  slug: "awaken-online-tarot",
  title: "Awaken Online: Tarot",
  status: "completed",
  grade: "B",
  unit: "unit/words",
  maturityRating: "R",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B086D7NPNK",
      externalLink: "https://www.amazon.com/dp/B086D7NPNK",
      lastSyncedAt: "2025-10-14",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
