import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const salvosBeast = {
  id: "019db533-f391-75ac-8cef-0522fa5dc7f8",
  type: "page-type/book",
  slug: "salvos-beast",
  title: "Salvos: Beast",
  status: "not-started",
  unit: "unit/words",
  position: 11,
  ownLength: 110750,
  publishedAt: "2023-11-01",
  partOfCollections: ["book-series/salvos"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0C6FYQ95H",
      externalLink: "https://amazon.com/dp/B0C6FYQ95H",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
