import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const jeffersonAndHisTime = {
  id: "01a06808-148f-7001-bee1-ecd74d5a1354",
  type: "page-type/book-collection",
  slug: "jefferson-and-his-time",
  title: "Jefferson & His Time",
  partOfCollections: ["book-collection/histories-2"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies BookCollection
