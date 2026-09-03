import type { TravelCollection } from "../travel-collection.page-type.ts"

export const unescoWorldHeritageSites = {
  id: "01a06808-caa5-7004-8cf5-318dad8c2d54",
  pageTypeSlug: "travel-collection",
  slug: "unesco-world-heritage-sites",
  title: "UNESCO World Heritage Sites",
  partOfSlugs: ["travel"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies TravelCollection
