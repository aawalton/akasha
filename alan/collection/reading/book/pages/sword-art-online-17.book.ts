import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const swordArtOnline17 = {
  id: "019db533-f38b-72e1-b350-b037fcf4f88b",
  type: "page-type/book",
  slug: "sword-art-online-17",
  title: "Sword Art Online 17",
  status: "not-started",
  author: "Reki Kawahara",
  unit: "unit/words",
  position: 17,
  ownLength: 56250,
  publishedAt: "2019-10-29",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07Q3QXTGD",
      externalLink: "https://amazon.com/dp/B07Q3QXTGD",
    },
  ],
} as const satisfies Book
