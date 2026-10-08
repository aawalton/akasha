import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const doctrinalNewTestamentCommentary = {
  id: "01a06808-148e-701b-822b-8e7fb6f57f53",
  type: "page-type/book-collection",
  slug: "doctrinal-new-testament-commentary",
  title: "Doctrinal New Testament Commentary",
  partOfCollections: ["book-collection/bruce-r-mcconkie"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "paused",
  createdAt: "2026-09-03T16:09:15.150Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookCollection
