import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theWideGreenWorldSeriesBeguilement = {
  id: "019db533-f39b-726c-aab6-81caf8ed7eef",
  type: "page-type/book",
  slug: "the-wide-green-world-series-beguilement",
  title: "The Wide Green World Series: Beguilement",
  status: "not-started",
  unit: "unit/words",
  ownLength: 97250,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000QCQ9RU",
      externalLink: "https://www.amazon.com/dp/B000QCQ9RU",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
