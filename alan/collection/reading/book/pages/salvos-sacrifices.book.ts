import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const salvosSacrifices = {
  id: "019db533-f391-7595-b938-9a457a50c2ba",
  type: "page-type/book",
  slug: "salvos-sacrifices",
  title: "Salvos: Sacrifices",
  status: "not-started",
  author: "Keith Jones",
  unit: "unit/words",
  position: 14,
  ownLength: 72750,
  publishedAt: "2025-05-02",
  partOfCollections: ["book-series/salvos"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DNFKQ25Z",
      externalLink: "https://amazon.com/dp/B0DNFKQ25Z",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
