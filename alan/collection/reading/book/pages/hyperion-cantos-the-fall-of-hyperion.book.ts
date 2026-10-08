import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const hyperionCantosTheFallOfHyperion = {
  id: "019db533-f39a-7a5e-9947-3508b47cbe5d",
  type: "page-type/book",
  slug: "hyperion-cantos-the-fall-of-hyperion",
  title: "Hyperion Cantos: The Fall of Hyperion",
  status: "not-started",
  author: "Dan Simmons",
  unit: "unit/words",
  position: 1,
  ownLength: 169000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B004G60FWM",
      externalLink: "https://www.amazon.com/dp/B004G60FWM",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
