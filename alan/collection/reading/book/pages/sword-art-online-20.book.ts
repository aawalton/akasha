import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const swordArtOnline20 = {
  id: "019db533-f38b-72d5-91b0-641776dd5456",
  type: "page-type/book",
  slug: "sword-art-online-20",
  title: "Sword Art Online 20",
  status: "not-started",
  author: "Reki Kawahara",
  unit: "unit/words",
  position: 20,
  ownLength: 57250,
  publishedAt: "2020-08-18",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B085XVHZN5",
      externalLink: "https://amazon.com/dp/B085XVHZN5",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
