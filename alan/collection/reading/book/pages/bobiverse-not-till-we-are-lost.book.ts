import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const bobiverseNotTillWeAreLost = {
  id: "019db533-f39a-7d9e-baa1-4c9855dc97a4",
  type: "page-type/book",
  slug: "bobiverse-not-till-we-are-lost",
  title: "Bobiverse: Not Till We Are Lost",
  status: "not-started",
  author: "Dennis E. Taylor",
  unit: "unit/words",
  position: 4,
  ownLength: 103250,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DQ4LGLHY",
      externalLink: "https://www.amazon.com/dp/B0DQ4LGLHY",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
