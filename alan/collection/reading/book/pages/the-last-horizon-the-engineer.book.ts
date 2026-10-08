import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theLastHorizonTheEngineer = {
  id: "019db533-f39a-7afc-95a4-09055e1a866a",
  type: "page-type/book",
  slug: "the-last-horizon-the-engineer",
  title: "The Last Horizon: The Engineer",
  status: "not-started",
  author: "William Shakespeare",
  unit: "unit/words",
  position: 1,
  ownLength: 104750,
  publishedAt: "2023-12-05",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CM6SG9WD",
      externalLink: "https://www.amazon.com/dp/B0CM6SG9WD",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
