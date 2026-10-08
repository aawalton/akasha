import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theSystemApocalypseSystemFinale = {
  id: "019db533-f391-7b7c-a1db-5e16f6ffe356",
  type: "page-type/book",
  slug: "the-system-apocalypse-system-finale",
  title: "The System Apocalypse: System Finale",
  status: "completed",
  author: "Ernst Bloch, J. T. Swann, Thompson, Peter",
  unit: "unit/words",
  position: 12,
  ownLength: 119000,
  ownProgress: 119000,
  publishedAt: "2022-03-01",
  partOfCollections: ["book-series/the-system-apocalypse"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09DQSNMNB",
      externalLink: "https://amazon.com/dp/B09DQSNMNB",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
