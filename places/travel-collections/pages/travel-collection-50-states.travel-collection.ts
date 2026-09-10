import type { TravelCollection } from "../travel-collection.page-type.types.ts"

export const travelCollection50States = {
  id: "01a06808-caa4-7000-a219-50f88ce35842",
  pageTypeSlug: "travel-collection",
  type: "travel-collection",
  slug: "travel-collection-50-states",
  title: "50 States",
  partOfCollections: ["travel"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies TravelCollection
