import type { BookCollection } from "../book-collection.page-type.types.ts"

export const journals = {
  id: "01a06808-148f-7002-bed8-df1398659b65",
  pageTypeSlug: "book-collection",
  type: "book-collection",
  slug: "journals",
  title: "Journals",
  partOfCollections: ["the-joseph-smith-papers"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies BookCollection
