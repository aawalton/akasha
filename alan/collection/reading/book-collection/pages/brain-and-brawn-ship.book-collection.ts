import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const brainAndBrawnShip = {
  id: "01a06808-148e-7009-8596-d4b5153081b8",
  type: "page-type/book-collection",
  slug: "brain-and-brawn-ship",
  title: "Brain & Brawn Ship",
  partOfCollections: ["author/anne-mccaffrey"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies BookCollection
