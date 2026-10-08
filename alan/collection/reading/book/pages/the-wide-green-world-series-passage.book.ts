import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theWideGreenWorldSeriesPassage = {
  id: "019db533-f39a-7868-928c-9c80ffa53261",
  type: "page-type/book",
  slug: "the-wide-green-world-series-passage",
  title: "The Wide Green World Series: Passage",
  status: "not-started",
  author: "William Shakespeare",
  unit: "unit/words",
  position: 2,
  ownLength: 108750,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0010SKSWQ",
      externalLink: "https://www.amazon.com/dp/B0010SKSWQ",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
