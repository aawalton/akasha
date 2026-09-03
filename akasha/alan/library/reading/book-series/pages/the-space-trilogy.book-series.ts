import type { BookSeries } from "../book-series.page-type.ts"

export const theSpaceTrilogy = {
  id: "019db533-f39b-7467-8c0b-53037b8faeca",
  pageTypeSlug: "book-series",
  slug: "the-space-trilogy",
  title: "The Space Trilogy",
  status: "not-started",
  unitSlug: "words",
  source: "kindle",
  externalId: "B09RFD1VBZ",
  externalLink: "https://www.amazon.com/dp/B09RFD1VBZ",
  lastSyncedAt: "2025-10-14",
} as const satisfies BookSeries
