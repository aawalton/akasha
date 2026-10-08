import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const thePathOfAscensionBook1 = {
  id: "019db533-f391-73ab-bdc5-f0ce03b6917a",
  type: "page-type/book",
  slug: "the-path-of-ascension-book-1",
  title: "The Path of Ascension",
  status: "completed",
  author: "C. Mantis",
  unit: "unit/words",
  position: 1,
  ownLength: 203000,
  ownProgress: 203000,
  publishedAt: "2022-10-04",
  partOfCollections: ["book-series/the-path-of-ascension"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0B5WNDY21",
      externalLink: "https://amazon.com/dp/B0B5WNDY21",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
