import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const bobiverseForWeAreMany = {
  id: "019db533-f39b-70e5-86ad-ef2cdbc4cc2a",
  type: "page-type/book",
  slug: "bobiverse-for-we-are-many",
  title: "Bobiverse: For We Are Many",
  status: "not-started",
  author: "Dennis E. Taylor",
  unit: "unit/words",
  position: 1,
  ownLength: 80250,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B01MZI77C0",
      externalLink: "https://www.amazon.com/dp/B01MZI77C0",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.043Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
