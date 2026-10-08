import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const sectorGeneralMajorOperation = {
  id: "019db533-f38b-73c5-bb19-e7e556fa4308",
  type: "page-type/book",
  slug: "sector-general-major-operation",
  title: "Sector General: Major Operation",
  status: "not-started",
  author: "James White",
  unit: "unit/words",
  position: 3,
  ownLength: 10000,
  publishedAt: "1981-04-12",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "0345293819",
      externalLink: "https://amazon.com/dp/0345293819",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
