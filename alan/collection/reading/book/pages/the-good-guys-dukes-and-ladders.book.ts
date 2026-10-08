import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theGoodGuysDukesAndLadders = {
  id: "019db533-f391-795c-b6d2-5c2250823f7d",
  type: "page-type/book",
  slug: "the-good-guys-dukes-and-ladders",
  title: "The Good Guys: Dukes and Ladders",
  status: "completed",
  unit: "unit/words",
  position: 5,
  ownLength: 85000,
  ownProgress: 85000,
  publishedAt: "2019-04-11",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07NDPZ1VS",
      externalLink: "https://amazon.com/dp/B07NDPZ1VS",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
