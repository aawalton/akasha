import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const salvosCuriousBeginnings = {
  id: "019db533-f391-762e-865e-bce1ecdf8688",
  type: "page-type/book",
  slug: "salvos-curious-beginnings",
  title: "Salvos: Curious Beginnings",
  status: "not-started",
  unit: "unit/words",
  position: 1,
  ownLength: 102500,
  publishedAt: "2021-01-12",
  partOfCollections: ["book-series/salvos"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B08SQD1DLR",
      externalLink: "https://amazon.com/dp/B08SQD1DLR",
    },
  ],
} as const satisfies Book
