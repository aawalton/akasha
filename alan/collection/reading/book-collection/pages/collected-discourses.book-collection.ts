import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const collectedDiscourses = {
  id: "01a06808-148e-7011-a126-18d7852d7803",
  type: "page-type/book-collection",
  slug: "collected-discourses",
  title: "Collected Discourses",
  partOfCollections: ["book-collection/discourses"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  createdAt: "2026-09-03T16:09:15.150Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookCollection
