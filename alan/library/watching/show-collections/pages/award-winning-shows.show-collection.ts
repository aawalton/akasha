import type { ShowCollection } from "../show-collection.page-type.ts"

export const awardWinningShows = {
  id: "01a06808-6a77-7002-9fc9-632d54829793",
  pageTypeSlug: "show-collection",
  type: "show-collection",
  slug: "award-winning-shows",
  title: "Award-winning Shows",
  partOfCollections: ["shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "not-applicable",
} as const satisfies ShowCollection
