import type { TravelCollection } from "../travel-collection.page-type.ts"

export const utahCities = {
  id: "01a06808-caa5-7005-870e-ce28be3e7f1a",
  pageTypeSlug: "travel-collection",
  slug: "utah-cities",
  title: "Utah Cities",
  partOfSlugs: ["travel"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies TravelCollection
