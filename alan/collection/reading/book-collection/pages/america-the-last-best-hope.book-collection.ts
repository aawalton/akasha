import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const americaTheLastBestHope = {
  id: "01a06808-148e-7002-9091-7b1d3484ee58",
  type: "page-type/book-collection",
  slug: "america-the-last-best-hope",
  title: "America: The Last Best Hope",
  partOfCollections: ["book-collection/histories-2"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies BookCollection
