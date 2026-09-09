import type { TravelCollection } from "../travel-collection.page-type.ts"

export const utahCounties = {
  id: "01a06808-caa5-7006-b6fc-2b25ff9a71ce",
  pageTypeSlug: "travel-collection",
  slug: "utah-counties",
  title: "Utah Counties",
  partOfCollections: ["travel"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies TravelCollection
