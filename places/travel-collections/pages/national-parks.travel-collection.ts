import type { TravelCollection } from "../travel-collection.page-type.ts"

export const nationalParks = {
  id: "01a06808-caa5-7000-8a25-f77e84251a66",
  pageTypeSlug: "travel-collection",
  slug: "national-parks",
  title: "National Parks",
  partOfSlugs: ["travel"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies TravelCollection
