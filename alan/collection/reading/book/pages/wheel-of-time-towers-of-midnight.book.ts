import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const wheelOfTimeTowersOfMidnight = {
  id: "019db533-f39a-7907-b97a-2eacb42226d5",
  type: "page-type/book",
  slug: "wheel-of-time-towers-of-midnight",
  title: "Wheel of Time: Towers of Midnight",
  status: "completed",
  grade: "B",
  author: "Robert Jordan, Brandon Sanderson",
  unit: "unit/words",
  position: 13,
  ownLength: 216250,
  ownProgress: 216250,
  publishedAt: "2011-01-31",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B003P8Q5QC",
      externalLink: "https://amazon.com/dp/B003P8Q5QC",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
