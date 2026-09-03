import type { BookCollection } from "../book-collection.page-type.ts"

export const theLordOfTheRings = {
  id: "01a06808-148f-7028-b743-27aebd7e1b31",
  pageTypeSlug: "book-collection",
  slug: "the-lord-of-the-rings",
  title: "The Lord of the Rings",
  partOfSlugs: ["the-lord-of-the-rings-books"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "completed",
  rank: "A",
  publishedAt: "1954-07-29",
} as const satisfies BookCollection
