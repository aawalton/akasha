import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const alienRiverOfPain = {
  id: "019db533-f39b-72af-bb59-f85a40d2a50d",
  type: "page-type/book",
  slug: "alien-river-of-pain",
  title: "Alien: River of Pain",
  status: "not-started",
  author: "Christopher Golden",
  unit: "unit/words",
  position: 2,
  ownLength: 84250,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B00KPBBTS6",
      externalLink: "https://www.amazon.com/dp/B00KPBBTS6",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
