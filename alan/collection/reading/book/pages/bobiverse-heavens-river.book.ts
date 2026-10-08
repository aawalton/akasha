import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const bobiverseHeavensRiver = {
  id: "019db533-f39a-7fcf-8199-7ab599179063",
  type: "page-type/book",
  slug: "bobiverse-heavens-river",
  title: "Bobiverse: Heaven's River",
  status: "not-started",
  author: "Dennis E. Taylor",
  unit: "unit/words",
  position: 3,
  ownLength: 160000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B08P3NTSSR",
      externalLink: "https://www.amazon.com/dp/B08P3NTSSR",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
