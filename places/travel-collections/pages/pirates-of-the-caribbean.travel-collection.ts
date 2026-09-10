import type { TravelCollection } from "../travel-collection.page-type.types.ts"

export const piratesOfTheCaribbean = {
  id: "01a06808-caa5-7001-82e9-fd16e052f9fb",
  pageTypeSlug: "travel-collection",
  type: "travel-collection",
  slug: "pirates-of-the-caribbean",
  title: "Pirates of the Caribbean",
  partOfCollections: ["pirates-of-the-caribbean-2"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "completed",
} as const satisfies TravelCollection
