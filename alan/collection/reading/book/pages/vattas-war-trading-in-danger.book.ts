import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const vattasWarTradingInDanger = {
  id: "019db533-f39a-78e9-9b87-add3f12498a2",
  type: "page-type/book",
  slug: "vattas-war-trading-in-danger",
  title: "Vatta's War: Trading in Danger",
  status: "not-started",
  author: "Elizabeth Moon",
  unit: "unit/words",
  ownLength: 78500,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000FBJBA4",
      externalLink: "https://www.amazon.com/dp/B000FBJBA4",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
