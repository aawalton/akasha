import type { BookSeries } from "akasha/alan/collection/reading/book-series/book-series.page-type.types.ts"

export const weaponsAndWielders = {
  id: "019db533-f38a-7446-b978-1c200bccce47",
  type: "page-type/book-series",
  slug: "weapons-and-wielders",
  title: "Weapons and Wielders",
  status: "following",
  unit: "unit/words",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0848WRBZW",
      externalLink: "https://www.amazon.com/Weapons-and-Wielders/dp/B0848WRBZW",
      lastSyncedAt: "2025-11-22",
    },
  ],
  createdAt: "2026-04-22T12:39:34.026Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookSeries
