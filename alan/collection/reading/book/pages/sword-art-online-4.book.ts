import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const swordArtOnline4 = {
  id: "019db533-f38b-734e-b4a6-21fbd1dae045",
  type: "page-type/book",
  slug: "sword-art-online-4",
  title: "Sword Art Online 4",
  status: "not-started",
  author: "Reki Kawahara",
  unit: "unit/words",
  position: 4,
  ownLength: 49000,
  publishedAt: "2017-05-30",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B06XK4NH17",
      externalLink: "https://amazon.com/dp/B06XK4NH17",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
