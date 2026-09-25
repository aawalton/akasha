import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const swordArtOnline2 = {
  id: "019db533-f38b-7387-b5b4-7eca0561ca60",
  type: "page-type/book",
  slug: "sword-art-online-2",
  title: "Sword Art Online 2",
  status: "not-started",
  author: "Reki Kawahara",
  unit: "unit/words",
  position: 2,
  ownLength: 64000,
  publishedAt: "2017-05-30",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B06XKQNK1N",
      externalLink: "https://amazon.com/dp/B06XKQNK1N",
    },
  ],
} as const satisfies Book
