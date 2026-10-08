import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const acorna = {
  id: "01a06808-148d-7000-8fd3-6c5914c2df3e",
  type: "page-type/book-collection",
  slug: "acorna",
  title: "Acorna",
  partOfCollections: ["author/anne-mccaffrey"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  createdAt: "2026-09-03T16:09:15.149Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookCollection
