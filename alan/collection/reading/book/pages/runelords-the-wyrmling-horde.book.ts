import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const runelordsTheWyrmlingHorde = {
  id: "019db533-f39a-7a2f-bb9e-25160e96bfa6",
  type: "page-type/book",
  slug: "runelords-the-wyrmling-horde",
  title: "Runelords: The Wyrmling Horde",
  status: "not-started",
  author: "David Farland",
  unit: "unit/words",
  position: 6,
  ownLength: 93000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B001652HRM",
      externalLink: "https://www.amazon.com/dp/B001652HRM",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
