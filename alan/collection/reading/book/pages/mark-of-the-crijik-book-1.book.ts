import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const markOfTheCrijikBook1 = {
  id: "019db533-f391-71f3-8fce-91ad835970a8",
  type: "page-type/book",
  slug: "mark-of-the-crijik-book-1",
  title: "Mark of the Crijik",
  status: "not-started",
  unit: "unit/words",
  position: 1,
  ownLength: 104500,
  publishedAt: "2022-11-01",
  partOfCollections: ["book-series/mark-of-the-crijik"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0B5YMG52D",
      externalLink: "https://amazon.com/dp/B0B5YMG52D",
    },
  ],
} as const satisfies Book
