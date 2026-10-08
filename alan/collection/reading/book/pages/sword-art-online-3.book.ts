import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const swordArtOnline3 = {
  id: "019db533-f38b-737a-b38f-81a24da37640",
  type: "page-type/book",
  slug: "sword-art-online-3",
  title: "Sword Art Online 3",
  status: "not-started",
  author: "Reki Kawahara",
  unit: "unit/words",
  position: 3,
  ownLength: 50750,
  publishedAt: "2017-05-30",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B06XKPCFBF",
      externalLink: "https://amazon.com/dp/B06XKPCFBF",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
