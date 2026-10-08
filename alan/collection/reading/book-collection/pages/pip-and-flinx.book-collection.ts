import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const pipAndFlinx = {
  id: "01a06808-148f-7009-8949-aae58e14acc0",
  type: "page-type/book-collection",
  slug: "pip-and-flinx",
  title: "Pip & Flinx",
  partOfCollections: ["book-collection/humanx-commonwealth"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  createdAt: "2026-09-03T16:09:15.151Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookCollection
