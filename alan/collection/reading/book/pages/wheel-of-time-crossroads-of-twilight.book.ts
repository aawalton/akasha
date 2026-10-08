import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const wheelOfTimeCrossroadsOfTwilight = {
  id: "019db533-f39b-718b-9dc1-ca5cc1b785fe",
  type: "page-type/book",
  slug: "wheel-of-time-crossroads-of-twilight",
  title: "Wheel of Time: Crossroads of Twilight",
  status: "completed",
  grade: "B",
  author: "Robert Jordan",
  unit: "unit/words",
  position: 10,
  ownLength: 156750,
  ownProgress: 156750,
  publishedAt: "2010-07-14",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B003K15P9M",
      externalLink: "https://amazon.com/dp/B003K15P9M",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.043Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
