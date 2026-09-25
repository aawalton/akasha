import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const hyperionCantosRiseOfEndymion = {
  id: "019db533-f39a-7c27-8b65-fac0e1a74581",
  type: "page-type/book",
  slug: "hyperion-cantos-rise-of-endymion",
  title: "Hyperion Cantos: Rise of Endymion",
  status: "not-started",
  author: "Dan Simmons",
  unit: "unit/words",
  position: 3,
  ownLength: 180500,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B004G60EKK",
      externalLink: "https://www.amazon.com/dp/B004G60EKK",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
