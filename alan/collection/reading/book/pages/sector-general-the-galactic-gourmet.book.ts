import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const sectorGeneralTheGalacticGourmet = {
  id: "019db533-f38b-717a-97cd-91d1b1f69479",
  type: "page-type/book",
  slug: "sector-general-the-galactic-gourmet",
  title: "Sector General: The Galactic Gourmet",
  status: "not-started",
  author: "James White",
  unit: "unit/words",
  position: 9,
  ownLength: 78000,
  publishedAt: "1997-01-01",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "0812562674",
      externalLink: "https://amazon.com/dp/0812562674",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
