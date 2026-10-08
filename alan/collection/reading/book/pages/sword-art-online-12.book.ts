import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const swordArtOnline12 = {
  id: "019db533-f38b-732d-98e4-9db72e89d65c",
  type: "page-type/book",
  slug: "sword-art-online-12",
  title: "Sword Art Online 12",
  status: "not-started",
  author: "Reki Kawahara",
  unit: "unit/words",
  position: 12,
  ownLength: 54000,
  publishedAt: "2017-12-19",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0719HS758",
      externalLink: "https://amazon.com/dp/B0719HS758",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
