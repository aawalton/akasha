import type { BookCollection } from "akasha/alan/library/reading/book-collections/book-collection.page-type.types.ts"

export const theAdventuresOfTomBombadil = {
  id: "01a06808-148f-7017-be56-deb0ce409200",
  type: "book-collection",
  slug: "the-adventures-of-tom-bombadil",
  title: "The Adventures of Tom Bombadil",
  partOfCollections: ["the-lord-of-the-rings-books"],
  position: 8,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
  publishedAt: "1962-11-22",
} as const satisfies BookCollection
