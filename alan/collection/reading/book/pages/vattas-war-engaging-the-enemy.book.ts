import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const vattasWarEngagingTheEnemy = {
  id: "019db533-f39b-7111-95d1-696d35047b74",
  type: "page-type/book",
  slug: "vattas-war-engaging-the-enemy",
  title: "Vatta's War: Engaging the Enemy",
  status: "not-started",
  author: "Elizabeth Moon",
  unit: "unit/words",
  position: 2,
  ownLength: 104000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000GCFCNW",
      externalLink: "https://www.amazon.com/dp/B000GCFCNW",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
