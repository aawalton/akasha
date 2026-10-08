import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theBadGuysSkullAndThrones = {
  id: "019db533-f391-77c7-92ce-eb030d8a83b3",
  type: "page-type/book",
  slug: "the-bad-guys-skull-and-thrones",
  title: "The Bad Guys: Skull and Thrones",
  status: "completed",
  author: "Winsor McCay",
  unit: "unit/words",
  position: 3,
  ownLength: 104000,
  ownProgress: 104000,
  publishedAt: "2020-02-06",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07YZWJ2ZC",
      externalLink: "https://amazon.com/dp/B07YZWJ2ZC",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
