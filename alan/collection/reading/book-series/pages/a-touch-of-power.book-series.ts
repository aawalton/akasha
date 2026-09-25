import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const aTouchOfPower = {
  id: "019db533-f38b-7953-8d0b-c76aabbd4fa6",
  type: "page-type/book-series",
  slug: "a-touch-of-power",
  title: "A Touch of Power",
  status: "following",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0FFT68QFH",
      externalLink: "https://www.amazon.com/dp/B0FFT68QFH",
      lastSyncedAt: "2025-10-14",
    },
  ],
} as const satisfies BookSeries
