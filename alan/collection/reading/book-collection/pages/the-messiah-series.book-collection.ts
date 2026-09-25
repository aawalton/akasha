import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const theMessiahSeries = {
  id: "01a06808-148f-702b-8318-e07f0375d06f",
  type: "page-type/book-collection",
  slug: "the-messiah-series",
  title: "The Messiah Series",
  partOfCollections: ["book-collection/bruce-r-mcconkie"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "paused",
} as const satisfies BookCollection
