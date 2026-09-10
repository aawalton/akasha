import type { TravelCollection } from "../travel-collection.page-type.types.ts"

export const utahStateParks = {
  id: "01a06808-caa5-7007-bef8-db3dddd30f06",
  pageTypeSlug: "travel-collection",
  type: "travel-collection",
  slug: "utah-state-parks",
  title: "Utah State Parks",
  partOfCollections: ["travel"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies TravelCollection
