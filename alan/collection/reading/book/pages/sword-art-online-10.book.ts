import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const swordArtOnline10 = {
  id: "019db533-f38b-731b-93d0-0da20c5e593e",
  type: "page-type/book",
  slug: "sword-art-online-10",
  title: "Sword Art Online 10",
  status: "not-started",
  author: "Reki Kawahara, Keiichi Sigsawa",
  unit: "unit/words",
  position: 10,
  ownLength: 65250,
  publishedAt: "2017-07-25",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B071HTR17V",
      externalLink: "https://amazon.com/dp/B071HTR17V",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
