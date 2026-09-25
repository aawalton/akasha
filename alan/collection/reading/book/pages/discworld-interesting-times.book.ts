import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const discworldInterestingTimes = {
  id: "019db533-f39b-70bd-b002-d86725d55e6b",
  type: "page-type/book",
  slug: "discworld-interesting-times",
  title: "Discworld: Interesting Times",
  status: "not-started",
  author: "Terry Pratchett",
  unit: "unit/words",
  position: 17,
  ownLength: 95750,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000TU16QI",
      externalLink: "https://www.amazon.com/dp/B000TU16QI",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
