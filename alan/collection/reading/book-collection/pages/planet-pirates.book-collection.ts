import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const planetPirates = {
  id: "01a06808-148f-700a-9aee-37b9d1f40bd1",
  type: "page-type/book-collection",
  slug: "planet-pirates",
  title: "Planet Pirates",
  partOfCollections: ["author/anne-mccaffrey"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies BookCollection
