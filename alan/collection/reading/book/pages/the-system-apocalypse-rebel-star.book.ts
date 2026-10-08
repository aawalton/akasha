import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theSystemApocalypseRebelStar = {
  id: "019db533-f391-7ba0-800b-020bf01f705f",
  type: "page-type/book",
  slug: "the-system-apocalypse-rebel-star",
  title: "The System Apocalypse: Rebel Star",
  status: "completed",
  unit: "unit/words",
  position: 8,
  ownLength: 103750,
  ownProgress: 103750,
  publishedAt: "2019-12-01",
  partOfCollections: ["book-series/the-system-apocalypse"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07Z9N8JKM",
      externalLink: "https://amazon.com/dp/B07Z9N8JKM",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
