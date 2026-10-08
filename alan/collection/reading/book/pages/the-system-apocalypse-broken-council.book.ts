import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theSystemApocalypseBrokenCouncil = {
  id: "019db533-f391-7b91-9f46-643bf0c6e57b",
  type: "page-type/book",
  slug: "the-system-apocalypse-broken-council",
  title: "The System Apocalypse: Broken Council",
  status: "completed",
  unit: "unit/words",
  position: 10,
  ownLength: 114750,
  ownProgress: 114750,
  publishedAt: "2021-02-01",
  partOfCollections: ["book-series/the-system-apocalypse"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B08SWNPLCW",
      externalLink: "https://amazon.com/dp/B08SWNPLCW",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
