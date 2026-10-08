import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const outOfTheDarkToChallengeHeaven = {
  id: "019db533-f39a-7862-92b0-6a9a3d6ecc15",
  type: "page-type/book",
  slug: "out-of-the-dark-to-challenge-heaven",
  title: "Out of the Dark: To Challenge Heaven",
  status: "not-started",
  unit: "unit/words",
  position: 2,
  ownLength: 69000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0C1X7LNMP",
      externalLink: "https://www.amazon.com/dp/B0C1X7LNMP",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
