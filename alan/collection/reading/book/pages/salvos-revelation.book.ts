import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const salvosRevelation = {
  id: "019db533-f391-758a-8e52-25be0769c51a",
  type: "page-type/book",
  slug: "salvos-revelation",
  title: "Salvos: Revelation",
  status: "not-started",
  unit: "unit/words",
  position: 10,
  ownLength: 101000,
  publishedAt: "2023-05-27",
  partOfCollections: ["book-series/salvos"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BTLXNH9V",
      externalLink: "https://amazon.com/dp/B0BTLXNH9V",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
