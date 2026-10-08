import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const dinosaurPlanet = {
  id: "01a06808-148e-7017-aca4-e8456095c014",
  type: "page-type/book-collection",
  slug: "dinosaur-planet",
  title: "Dinosaur Planet",
  partOfCollections: ["author/anne-mccaffrey"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  createdAt: "2026-09-03T16:09:15.150Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookCollection
