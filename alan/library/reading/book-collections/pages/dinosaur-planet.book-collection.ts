import type { BookCollection } from "../book-collection.page-type.ts"

export const dinosaurPlanet = {
  id: "01a06808-148e-7017-aca4-e8456095c014",
  pageTypeSlug: "book-collection",
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
