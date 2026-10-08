import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const healthAndWellness = {
  id: "01a06808-148e-7025-b58e-99fcf9f280bf",
  type: "page-type/book-collection",
  slug: "health-and-wellness",
  title: "Health & Wellness",
  partOfCollections: ["book-collection/audible"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "in-progress",
  createdAt: "2026-09-03T16:09:15.150Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookCollection
