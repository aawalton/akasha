import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const businessClassics = {
  id: "01a06808-148e-700f-9c77-c9de5d6cdff1",
  type: "page-type/book-collection",
  slug: "business-classics",
  title: "Business Classics",
  partOfCollections: ["book-collection/classics-collections"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "completed",
} as const satisfies BookCollection
