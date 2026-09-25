import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const safeholdThroughFieryTrials = {
  id: "019db533-f39a-78fe-aa42-416288293d14",
  type: "page-type/book",
  slug: "safehold-through-fiery-trials",
  title: "Safehold: Through Fiery Trials",
  status: "not-started",
  author: "David Weber",
  unit: "unit/words",
  position: 9,
  ownLength: 172500,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07C75P1R8",
      externalLink: "https://www.amazon.com/dp/B07C75P1R8",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
