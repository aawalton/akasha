import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const pernDragonheart = {
  id: "019db533-f39b-71d0-9aac-2c8609b025af",
  type: "page-type/book",
  slug: "pern-dragonheart",
  title: "Pern: Dragonheart",
  status: "not-started",
  author: "Todd McCaffrey",
  unit: "unit/words",
  position: 8,
  ownLength: 136500,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0015DWLW6",
      externalLink: "https://www.amazon.com/dp/B0015DWLW6",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
