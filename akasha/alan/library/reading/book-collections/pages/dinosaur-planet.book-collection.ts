import type { BookCollection } from "../book-collection.page-type.ts"

export const dinosaurPlanet = {
  id: "01a06808-148e-7017-aca4-e8456095c014",
  pageTypeSlug: "book-collection",
  slug: "dinosaur-planet",
  title: "Dinosaur Planet",
  partOfSlugs: ["anne-mccaffrey"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies BookCollection
