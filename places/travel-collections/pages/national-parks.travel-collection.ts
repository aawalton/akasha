import type { TravelCollection } from "../travel-collection.page-type.types.ts"

export const nationalParks = {
  id: "01a06808-caa5-7000-8a25-f77e84251a66",
  pageTypeSlug: "travel-collection",
  type: "travel-collection",
  slug: "national-parks",
  title: "National Parks",
  partOfCollections: ["travel"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies TravelCollection
