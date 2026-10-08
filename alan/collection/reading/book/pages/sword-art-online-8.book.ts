import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const swordArtOnline8 = {
  id: "019db533-f38b-7311-9703-1a8418c7c7ab",
  type: "page-type/book",
  slug: "sword-art-online-8",
  title: "Sword Art Online 8",
  status: "not-started",
  author: "Reki Kawahara",
  unit: "unit/words",
  position: 8,
  ownLength: 76750,
  publishedAt: "2017-07-25",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B071HTPF39",
      externalLink: "https://amazon.com/dp/B071HTPF39",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
