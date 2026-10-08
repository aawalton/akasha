import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const thePathOfAscension11 = {
  id: "019db533-f386-7706-897b-d08487039054",
  type: "page-type/book",
  slug: "the-path-of-ascension-11",
  title: "The Path of Ascension 11",
  status: "not-started",
  author: "Frederic William Farrar",
  unit: "unit/words",
  position: 11,
  ownLength: 164000,
  publishedAt: "2026-03-04",
  partOfCollections: ["book-series/the-path-of-ascension"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0FT45KVPP",
      externalLink: "https://amazon.com/dp/B0FT45KVPP",
    },
  ],
  createdAt: "2026-04-22T12:39:34.022Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
