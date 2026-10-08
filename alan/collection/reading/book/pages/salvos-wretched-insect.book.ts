import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const salvosWretchedInsect = {
  id: "019db533-f391-75ce-8ad9-764b5923a876",
  type: "page-type/book",
  slug: "salvos-wretched-insect",
  title: "Salvos: Wretched Insect",
  status: "not-started",
  unit: "unit/words",
  position: 7,
  ownLength: 97500,
  publishedAt: "2022-08-02",
  partOfCollections: ["book-series/salvos"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0B4R3Q5PZ",
      externalLink: "https://amazon.com/dp/B0B4R3Q5PZ",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
