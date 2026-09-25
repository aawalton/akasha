import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const pernDragonsdawn = {
  id: "019db533-f39b-7202-b684-4808153f3280",
  type: "page-type/book",
  slug: "pern-dragonsdawn",
  title: "Pern: Dragonsdawn",
  status: "not-started",
  author: "Anne McCaffrey",
  unit: "unit/words",
  position: 5,
  ownLength: 96000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000FBFODM",
      externalLink: "https://www.amazon.com/dp/B000FBFODM",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
