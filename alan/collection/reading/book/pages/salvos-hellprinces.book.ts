import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const salvosHellprinces = {
  id: "019db533-f391-75b8-880c-27fe4dbd669e",
  type: "page-type/book",
  slug: "salvos-hellprinces",
  title: "Salvos: Hellprinces",
  status: "not-started",
  unit: "unit/words",
  position: 9,
  ownLength: 191750,
  publishedAt: "2023-02-01",
  partOfCollections: ["book-series/salvos"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BH1J57WT",
      externalLink: "https://amazon.com/dp/B0BH1J57WT",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
