import type { BookCollection } from "../book-collection.page-type.types.ts"

export const classicsCollections = {
  id: "01a06808-148e-7010-984c-c148a26010c1",
  pageTypeSlug: "book-collection",
  type: "book-collection",
  slug: "classics-collections",
  title: "Classics Collections",
  partOfCollections: ["book-collections"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-applicable",
} as const satisfies BookCollection
