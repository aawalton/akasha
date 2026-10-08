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
  createdAt: "2026-09-03T16:09:15.150Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookCollection
