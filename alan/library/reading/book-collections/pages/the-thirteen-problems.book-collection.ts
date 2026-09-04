import type { BookCollection } from "../book-collection.page-type.ts"

export const theThirteenProblems = {
  id: "01a06808-148f-7032-8669-ea78f52cb1c9",
  pageTypeSlug: "book-collection",
  slug: "the-thirteen-problems",
  title: "The Thirteen Problems",
  partOfSlugs: ["miss-marple"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies BookCollection
