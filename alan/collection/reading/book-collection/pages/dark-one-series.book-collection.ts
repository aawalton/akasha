import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const darkOneSeries = {
  id: "01a06808-148e-7016-b24f-d48e193bd689",
  type: "page-type/book-collection",
  slug: "dark-one-series",
  title: "Dark One Series",
  partOfCollections: ["book-collection/brandon-sanderson-s-non-cosmere-books"],
  position: 12,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies BookCollection
