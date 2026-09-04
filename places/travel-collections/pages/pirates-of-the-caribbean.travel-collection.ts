import type { TravelCollection } from "../travel-collection.page-type.ts"

export const piratesOfTheCaribbean = {
  id: "01a06808-caa5-7001-82e9-fd16e052f9fb",
  pageTypeSlug: "travel-collection",
  slug: "pirates-of-the-caribbean",
  title: "Pirates of the Caribbean",
  partOfSlugs: ["pirates-of-the-caribbean-2"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "completed",
} as const satisfies TravelCollection
