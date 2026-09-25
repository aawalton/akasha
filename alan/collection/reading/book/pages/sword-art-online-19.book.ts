import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const swordArtOnline19 = {
  id: "019db533-f38b-72cd-aab1-45efe782d42a",
  type: "page-type/book",
  slug: "sword-art-online-19",
  title: "Sword Art Online 19",
  status: "not-started",
  author: "Reki Kawahara",
  unit: "unit/words",
  position: 19,
  ownLength: 42000,
  publishedAt: "2020-04-21",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0827J2V7W",
      externalLink: "https://amazon.com/dp/B0827J2V7W",
    },
  ],
} as const satisfies Book
