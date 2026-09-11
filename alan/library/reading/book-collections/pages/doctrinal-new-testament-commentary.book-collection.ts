import type { BookCollection } from "akasha/alan/library/reading/book-collections/book-collection.page-type.types.ts"

export const doctrinalNewTestamentCommentary = {
  id: "01a06808-148e-701b-822b-8e7fb6f57f53",
  type: "book-collection",
  slug: "doctrinal-new-testament-commentary",
  title: "Doctrinal New Testament Commentary",
  partOfCollections: ["bruce-r-mcconkie"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "paused",
} as const satisfies BookCollection
