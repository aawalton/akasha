import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const millennialMageVoidbound = {
  id: "019db533-f391-72c6-862a-fad012b680f8",
  type: "page-type/book",
  slug: "millennial-mage-voidbound",
  title: "Millennial Mage: Voidbound",
  status: "completed",
  unit: "unit/words",
  position: 10,
  ownLength: 180750,
  ownProgress: 180750,
  publishedAt: "2025-08-20",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0F4PZD4D9",
      externalLink: "https://amazon.com/dp/B0F4PZD4D9",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
