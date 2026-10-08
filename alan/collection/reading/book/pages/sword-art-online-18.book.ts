import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const swordArtOnline18 = {
  id: "019db533-f38b-72c5-9407-2bfc9f5512da",
  type: "page-type/book",
  slug: "sword-art-online-18",
  title: "Sword Art Online 18",
  status: "not-started",
  author: "Reki Kawahara",
  unit: "unit/words",
  position: 18,
  ownLength: 81750,
  publishedAt: "2020-01-07",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07SSS2V3X",
      externalLink: "https://amazon.com/dp/B07SSS2V3X",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
