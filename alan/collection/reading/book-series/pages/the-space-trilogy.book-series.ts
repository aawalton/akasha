import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const theSpaceTrilogy = {
  id: "019db533-f39b-7467-8c0b-53037b8faeca",
  type: "page-type/book-series",
  slug: "the-space-trilogy",
  title: "The Space Trilogy",
  status: "not-started",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09RFD1VBZ",
      externalLink: "https://www.amazon.com/dp/B09RFD1VBZ",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
