import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const pernDragonsFire = {
  id: "019db533-f39b-722f-b0d5-247677e68464",
  type: "page-type/book",
  slug: "pern-dragons-fire",
  title: "Pern: Dragon's Fire",
  status: "not-started",
  author: "Anne McCaffrey, Todd McCaffrey",
  unit: "unit/words",
  position: 5,
  ownLength: 96000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000JMKNK6",
      externalLink: "https://www.amazon.com/dp/B000JMKNK6",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
