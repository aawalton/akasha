import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const cinnamonBun = {
  id: "019db533-f38b-789f-8e7b-b30358a74147",
  type: "page-type/book-series",
  slug: "cinnamon-bun",
  title: "Cinnamon Bun",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BPTDKDS4",
      externalLink: "https://www.amazon.com/dp/B0BPTDKDS4",
      lastSyncedAt: "2025-10-14",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
