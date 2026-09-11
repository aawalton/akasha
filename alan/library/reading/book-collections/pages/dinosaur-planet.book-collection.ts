import type { BookCollection } from "akasha/alan/library/reading/book-collections/book-collection.page-type.types.ts"

export const dinosaurPlanet = {
  id: "01a06808-148e-7017-aca4-e8456095c014",
  type: "book-collection",
  slug: "dinosaur-planet",
  title: "Dinosaur Planet",
  partOfCollections: ["anne-mccaffrey"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies BookCollection
