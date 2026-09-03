import type { BookCollection } from "../book-collection.page-type.ts"

export const theChildrenOfHurin = {
  id: "01a06808-148f-7019-a11e-86edce2c119c",
  pageTypeSlug: "book-collection",
  slug: "the-children-of-hurin",
  title: "The Children of Húrin",
  partOfSlugs: ["the-lord-of-the-rings-books"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  publishedAt: "2007-04-17",
} as const satisfies BookCollection
