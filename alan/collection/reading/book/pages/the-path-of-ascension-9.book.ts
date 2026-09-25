import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const thePathOfAscension9 = {
  id: "019db533-f391-7373-b60a-41f2709cea86",
  type: "page-type/book",
  slug: "the-path-of-ascension-9",
  title: "The Path of Ascension 9",
  status: "completed",
  author: "Frederic William Farrar",
  unit: "unit/words",
  position: 9,
  ownLength: 136500,
  ownProgress: 136500,
  publishedAt: "2025-06-04",
  partOfCollections: ["book-series/the-path-of-ascension"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DV9Z333L",
      externalLink: "https://amazon.com/dp/B0DV9Z333L",
    },
  ],
} as const satisfies Book
