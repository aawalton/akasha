import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const defianceOfTheFall = {
  id: "019db533-f38b-7879-9c61-c81a9ac1d05c",
  type: "page-type/book-series",
  slug: "defiance-of-the-fall",
  title: "Defiance of the Fall",
  status: "following",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0916H6FBX",
      externalLink: "https://www.amazon.com/dp/B0916H6FBX",
      lastSyncedAt: "2026-02-14",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
