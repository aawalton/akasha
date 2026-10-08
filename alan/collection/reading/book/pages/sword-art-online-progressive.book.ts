import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const swordArtOnlineProgressive = {
  id: "019db533-f391-773b-91b1-768369dc7205",
  type: "page-type/book",
  slug: "sword-art-online-progressive",
  title: "Sword Art Online Progressive",
  status: "completed",
  author: "Reki Kawahara",
  unit: "unit/words",
  position: 1,
  ownLength: 94000,
  ownProgress: 94000,
  publishedAt: "2017-06-20",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B06XZKB6XR",
      externalLink: "https://amazon.com/dp/B06XZKB6XR",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
