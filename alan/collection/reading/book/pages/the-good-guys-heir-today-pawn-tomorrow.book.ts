import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theGoodGuysHeirTodayPawnTomorrow = {
  id: "019db533-f391-7974-8924-c050a2883e34",
  type: "page-type/book",
  slug: "the-good-guys-heir-today-pawn-tomorrow",
  title: "The Good Guys: Heir Today, Pawn Tomorrow",
  status: "completed",
  unit: "unit/words",
  position: 2,
  ownLength: 66500,
  ownProgress: 66500,
  publishedAt: "2018-10-25",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07HRZ9WB2",
      externalLink: "https://amazon.com/dp/B07HRZ9WB2",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
