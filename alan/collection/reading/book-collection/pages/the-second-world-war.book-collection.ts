import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const theSecondWorldWar = {
  id: "01a06808-148f-702f-a067-53ad9c185fc5",
  type: "page-type/book-collection",
  slug: "the-second-world-war",
  title: "The Second World War",
  partOfCollections: ["book-collection/histories-2"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies BookCollection
