import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const salvosCorruptionAndCentinels = {
  id: "019db533-f391-7601-8786-aae9254d572d",
  type: "page-type/book",
  slug: "salvos-corruption-and-centinels",
  title: "Salvos: Corruption and Centinels",
  status: "not-started",
  unit: "unit/words",
  position: 5,
  ownLength: 101750,
  publishedAt: "2022-03-02",
  partOfCollections: ["book-series/salvos"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09S3ZVK8L",
      externalLink: "https://amazon.com/dp/B09S3ZVK8L",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
