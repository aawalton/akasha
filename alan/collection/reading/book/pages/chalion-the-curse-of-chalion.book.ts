import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const chalionTheCurseOfChalion = {
  id: "019db533-f39a-7aa1-85ca-006797d633bc",
  type: "page-type/book",
  slug: "chalion-the-curse-of-chalion",
  title: "Chalion: The Curse of Chalion",
  status: "not-started",
  author: "Lois McMaster Bujold",
  unit: "unit/words",
  ownLength: 128000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000FC11AQ",
      externalLink: "https://www.amazon.com/dp/B000FC11AQ",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
