import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const wheelOfTimeACrownOfSwords = {
  id: "019db533-f39b-73ec-b406-d05c1d5c2063",
  type: "page-type/book",
  slug: "wheel-of-time-a-crown-of-swords",
  title: "Wheel of Time: A Crown of Swords",
  status: "completed",
  grade: "B",
  author: "Robert Jordan",
  unit: "unit/words",
  position: 7,
  ownLength: 225500,
  ownProgress: 225500,
  publishedAt: "2010-04-14",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B003H4I5G2",
      externalLink: "https://amazon.com/dp/B003H4I5G2",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
