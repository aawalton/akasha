import type { TravelCollection } from "../travel-collection.page-type.ts"

export const countries = {
  id: "01a06808-caa4-7001-9399-2dfd25f2f4af",
  pageTypeSlug: "travel-collection",
  slug: "countries",
  title: "Countries",
  partOfSlugs: ["travel"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies TravelCollection
