import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const thePathOfAscension2 = {
  id: "019db533-f391-73ba-b7d2-ddb3d47c13ec",
  type: "page-type/book",
  slug: "the-path-of-ascension-2",
  title: "The Path of Ascension 2",
  status: "completed",
  author: "C. Mantis",
  unit: "unit/words",
  position: 2,
  ownLength: 115500,
  ownProgress: 115500,
  publishedAt: "2023-02-07",
  partOfCollections: ["book-series/the-path-of-ascension"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BGJN8BV8",
      externalLink: "https://amazon.com/dp/B0BGJN8BV8",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
