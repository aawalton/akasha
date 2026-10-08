import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const partnersInCrime = {
  id: "01a06808-148f-7007-a617-57d07f3516f1",
  type: "page-type/book-collection",
  slug: "partners-in-crime",
  title: "Partners in Crime",
  partOfCollections: ["book-collection/tommy-and-tuppence"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  createdAt: "2026-09-03T16:09:15.151Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookCollection
