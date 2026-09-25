import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const theThirteenProblems = {
  id: "01a06808-148f-7032-8669-ea78f52cb1c9",
  type: "page-type/book-collection",
  slug: "the-thirteen-problems",
  title: "The Thirteen Problems",
  partOfCollections: ["book-collection/miss-marple"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies BookCollection
