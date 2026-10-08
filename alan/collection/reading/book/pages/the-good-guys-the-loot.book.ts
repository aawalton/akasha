import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theGoodGuysTheLoot = {
  id: "019db533-f391-794c-aa2b-c1dec25f66a6",
  type: "page-type/book",
  slug: "the-good-guys-the-loot",
  title: "The Good Guys: The Loot",
  status: "completed",
  unit: "unit/words",
  position: 4,
  ownLength: 69000,
  ownProgress: 69000,
  publishedAt: "2019-02-14",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07LCCV2HQ",
      externalLink: "https://amazon.com/dp/B07LCCV2HQ",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
