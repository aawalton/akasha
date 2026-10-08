import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const salvosPrimevalKnowledge = {
  id: "019db533-f391-75e5-bf0b-7016c7fa3cff",
  type: "page-type/book",
  slug: "salvos-primeval-knowledge",
  title: "Salvos: Primeval Knowledge",
  status: "not-started",
  unit: "unit/words",
  position: 4,
  ownLength: 197750,
  publishedAt: "2021-12-02",
  partOfCollections: ["book-series/salvos"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09BMPYZXF",
      externalLink: "https://amazon.com/dp/B09BMPYZXF",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
