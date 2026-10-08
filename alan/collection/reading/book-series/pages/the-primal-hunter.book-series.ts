import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const thePrimalHunter = {
  id: "019db533-f38b-7662-9833-ee013709d392",
  type: "page-type/book-series",
  slug: "the-primal-hunter",
  title: "The Primal Hunter",
  status: "following",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09MV5TTSM",
      externalLink: "https://www.amazon.com/dp/B09MV5TTSM",
      lastSyncedAt: "2026-02-14",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
