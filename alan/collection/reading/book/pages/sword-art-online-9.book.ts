import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const swordArtOnline9 = {
  id: "019db533-f38b-7324-a579-6967ba536d20",
  type: "page-type/book",
  slug: "sword-art-online-9",
  title: "Sword Art Online 9",
  status: "not-started",
  author: "Reki Kawahara",
  unit: "unit/words",
  position: 9,
  ownLength: 73000,
  publishedAt: "2017-07-25",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B072BW2KB2",
      externalLink: "https://amazon.com/dp/B072BW2KB2",
    },
  ],
} as const satisfies Book
