import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const swordArtOnline14 = {
  id: "019db533-f38b-72eb-9466-bfaed89c2c8f",
  type: "page-type/book",
  slug: "sword-art-online-14",
  title: "Sword Art Online 14",
  status: "not-started",
  author: "Reki Kawahara",
  unit: "unit/words",
  position: 14,
  ownLength: 61250,
  publishedAt: "2018-08-21",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B077XCLDW2",
      externalLink: "https://amazon.com/dp/B077XCLDW2",
    },
  ],
} as const satisfies Book
