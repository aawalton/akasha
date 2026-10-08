import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const scienceClassics = {
  id: "01a06808-148f-700f-9486-4754bedd97d4",
  type: "page-type/book-collection",
  slug: "science-classics",
  title: "Science Classics",
  partOfCollections: ["book-collection/classics-collections"],
  position: 8,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "paused",
  createdAt: "2026-09-03T16:09:15.151Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookCollection
