import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const swordArtOnline7 = {
  id: "019db533-f38b-7361-9bd4-21c367ba6b11",
  type: "page-type/book",
  slug: "sword-art-online-7",
  title: "Sword Art Online 7",
  status: "not-started",
  author: "Reki Kawahara, Neko Nekobyou",
  unit: "unit/words",
  position: 7,
  ownLength: 52000,
  publishedAt: "2017-06-27",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B06XRDGQLD",
      externalLink: "https://amazon.com/dp/B06XRDGQLD",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
