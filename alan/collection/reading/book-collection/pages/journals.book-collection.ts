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
  createdAt: "2026-09-03T16:09:15.151Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookCollection
