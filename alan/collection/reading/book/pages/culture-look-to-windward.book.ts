import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const cultureLookToWindward = {
  id: "019db533-f39a-7e54-bf12-d4d60e1734bf",
  type: "page-type/book",
  slug: "culture-look-to-windward",
  title: "Culture: Look to Windward",
  status: "not-started",
  author: "Iain Banks",
  unit: "unit/words",
  position: 5,
  ownLength: 104250,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B001D20270",
      externalLink: "https://www.amazon.com/dp/B001D20270",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
