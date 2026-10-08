import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const salvosADemonsPride = {
  id: "019db533-f391-760e-8959-0f5912665f03",
  type: "page-type/book",
  slug: "salvos-a-demons-pride",
  title: "Salvos: A Demon's Pride",
  status: "not-started",
  unit: "unit/words",
  position: 2,
  ownLength: 173250,
  publishedAt: "2021-04-12",
  partOfCollections: ["book-series/salvos"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B092DQJNTT",
      externalLink: "https://amazon.com/dp/B092DQJNTT",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
