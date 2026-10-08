import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const sectorGeneral5 = {
  id: "019db533-f38b-73bc-bfcf-ed5f03f73c4b",
  type: "page-type/book",
  slug: "sector-general-5",
  title: "Sector General 5",
  status: "not-started",
  author: "James White",
  unit: "unit/words",
  position: 5,
  ownLength: 49000,
  publishedAt: "1987-06-12",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "0345346270",
      externalLink: "https://amazon.com/dp/0345346270",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
