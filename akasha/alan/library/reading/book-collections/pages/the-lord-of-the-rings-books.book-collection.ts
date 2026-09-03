import type { BookCollection } from "../book-collection.page-type.ts"

export const theLordOfTheRingsBooks = {
  id: "01a06808-148f-7029-86d6-640d5081b929",
  pageTypeSlug: "book-collection",
  slug: "the-lord-of-the-rings-books",
  title: "The Lord of the Rings Books",
  partOfSlugs: ["the-lord-of-the-rings-2"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "following",
  rank: "A",
} as const satisfies BookCollection
