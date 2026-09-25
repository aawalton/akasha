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
} as const satisfies BookCollection
