import type { ShowCollection } from "../show-collection.page-type.ts"

export const awardWinningShows = {
  id: "01a06808-6a77-7002-9fc9-632d54829793",
  pageTypeSlug: "show-collection",
  slug: "award-winning-shows",
  title: "Award-winning Shows",
  partOfSlugs: ["shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-applicable",
} as const satisfies ShowCollection
