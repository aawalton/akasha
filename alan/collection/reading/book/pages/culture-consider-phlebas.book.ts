import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const cultureConsiderPhlebas = {
  id: "019db533-f39b-72db-bcfe-6bd2995ea7a1",
  type: "page-type/book",
  slug: "culture-consider-phlebas",
  title: "Culture: Consider Phlebas",
  status: "not-started",
  author: "Iain Banks",
  unit: "unit/words",
  ownLength: 136250,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0013TX6FI",
      externalLink: "https://www.amazon.com/dp/B0013TX6FI",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
