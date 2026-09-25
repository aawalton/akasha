import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const pernDragonseye = {
  id: "019db533-f39b-72a7-b3d9-da0767e40d3d",
  type: "page-type/book",
  slug: "pern-dragonseye",
  title: "Pern: Dragonseye",
  status: "not-started",
  author: "Anne McCaffrey, Dick Hill",
  unit: "unit/words",
  position: 3,
  ownLength: 104000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000FBFOPU",
      externalLink: "https://www.amazon.com/dp/B000FBFOPU",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
