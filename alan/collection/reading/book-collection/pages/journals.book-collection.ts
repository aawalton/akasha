import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const journals = {
  id: "01a06808-148f-7002-bed8-df1398659b65",
  type: "page-type/book-collection",
  slug: "journals",
  title: "Journals",
  partOfCollections: ["book-collection/the-joseph-smith-papers"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies BookCollection
