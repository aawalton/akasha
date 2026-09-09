import type { TravelCollection } from "../travel-collection.page-type.ts"

export const smithsonianMuseums = {
  id: "01a06808-caa5-7002-a11e-f306380e4ad5",
  pageTypeSlug: "travel-collection",
  type: "travel-collection",
  slug: "smithsonian-museums",
  title: "Smithsonian Museums",
  partOfCollections: ["travel"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies TravelCollection
