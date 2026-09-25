import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const berenAndLuthien = {
  id: "01a06808-148e-7005-910b-18b3952cff69",
  type: "page-type/book-collection",
  slug: "beren-and-luthien",
  title: "Beren and Lúthien",
  partOfCollections: ["book-collection/the-lord-of-the-rings-books"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  publishedAt: "2017-05-04",
} as const satisfies BookCollection
