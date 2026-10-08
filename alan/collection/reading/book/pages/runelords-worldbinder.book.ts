import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const runelordsWorldbinder = {
  id: "019db533-f39a-77fa-9dca-e6452e993c75",
  type: "page-type/book",
  slug: "runelords-worldbinder",
  title: "Runelords: Worldbinder",
  status: "not-started",
  author: "David Farland",
  unit: "unit/words",
  position: 5,
  ownLength: 96000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000UZQI56",
      externalLink: "https://www.amazon.com/dp/B000UZQI56",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
