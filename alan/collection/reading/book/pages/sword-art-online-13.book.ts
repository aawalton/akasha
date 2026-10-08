import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const swordArtOnline13 = {
  id: "019db533-f38b-7307-a182-dc8647fafe0b",
  type: "page-type/book",
  slug: "sword-art-online-13",
  title: "Sword Art Online 13",
  status: "not-started",
  author: "Reki Kawahara",
  unit: "unit/words",
  position: 13,
  ownLength: 44000,
  publishedAt: "2018-04-24",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B074M6F3TF",
      externalLink: "https://amazon.com/dp/B074M6F3TF",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
