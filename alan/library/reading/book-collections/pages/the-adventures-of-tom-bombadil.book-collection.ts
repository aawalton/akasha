import type { BookCollection } from "../book-collection.page-type.ts"

export const theAdventuresOfTomBombadil = {
  id: "01a06808-148f-7017-be56-deb0ce409200",
  pageTypeSlug: "book-collection",
  slug: "the-adventures-of-tom-bombadil",
  title: "The Adventures of Tom Bombadil",
  partOfSlugs: ["the-lord-of-the-rings-books"],
  position: 8,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  publishedAt: "1962-11-22",
} as const satisfies BookCollection
