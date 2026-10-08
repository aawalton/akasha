import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const classicsCollections = {
  id: "01a06808-148e-7010-984c-c148a26010c1",
  type: "page-type/book-collection",
  slug: "classics-collections",
  title: "Classics Collections",
  partOfCollections: ["book-collection/book-collections"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-applicable",
  createdAt: "2026-09-03T16:09:15.150Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookCollection
