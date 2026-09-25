import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const wheelOfTimeLordOfChaos = {
  id: "019db533-f39a-7f41-a7bc-5a6907885716",
  type: "page-type/book",
  slug: "wheel-of-time-lord-of-chaos",
  title: "Wheel of Time: Lord of Chaos",
  status: "completed",
  grade: "B",
  author: "Robert Jordan",
  unit: "unit/words",
  position: 6,
  ownLength: 262250,
  ownProgress: 262250,
  publishedAt: "2010-03-11",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B003BQZ80M",
      externalLink: "https://amazon.com/dp/B003BQZ80M",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
