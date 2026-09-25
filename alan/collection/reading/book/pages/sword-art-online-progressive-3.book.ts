import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const swordArtOnlineProgressive3 = {
  id: "019db533-f391-7709-a4d9-6a499844e096",
  type: "page-type/book",
  slug: "sword-art-online-progressive-3",
  title: "Sword Art Online Progressive 3",
  status: "completed",
  author: "Reki Kawahara, Abec",
  unit: "unit/words",
  position: 3,
  ownLength: 67500,
  ownProgress: 67500,
  publishedAt: "2017-07-18",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B06XZZH57H",
      externalLink: "https://amazon.com/dp/B06XZZH57H",
    },
  ],
} as const satisfies Book
