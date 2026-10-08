import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const honorHarringtonOnBasiliskStation = {
  id: "019db533-f39a-7d94-8473-df14a053bb2b",
  type: "page-type/book",
  slug: "honor-harrington-on-basilisk-station",
  title: "Honor Harrington: On Basilisk Station",
  status: "paused",
  author: "David Weber",
  unit: "unit/words",
  ownLength: 84500,
  ownProgress: 1250,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B00ARPJBS0",
      externalLink: "https://www.amazon.com/dp/B00ARPJBS0",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
