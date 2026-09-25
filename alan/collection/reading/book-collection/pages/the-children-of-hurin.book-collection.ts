import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const theChildrenOfHurin = {
  id: "01a06808-148f-7019-a11e-86edce2c119c",
  type: "page-type/book-collection",
  slug: "the-children-of-hurin",
  title: "The Children of Húrin",
  partOfCollections: ["book-collection/the-lord-of-the-rings-books"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  publishedAt: "2007-04-17",
} as const satisfies BookCollection
