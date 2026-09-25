import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const swordArtOnline16 = {
  id: "019db533-f38b-72f3-baa6-716c9805d283",
  type: "page-type/book",
  slug: "sword-art-online-16",
  title: "Sword Art Online 16",
  status: "not-started",
  author: "Reki Kawahara",
  unit: "unit/words",
  position: 16,
  ownLength: 54250,
  publishedAt: "2019-05-21",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07L2XWHWP",
      externalLink: "https://amazon.com/dp/B07L2XWHWP",
    },
  ],
} as const satisfies Book
