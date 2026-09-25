import type { ShowCollection } from "akasha/alan/collection/watching/show-collection/show-collection.page-type.types.ts"

export const awardWinningShows = {
  id: "01a06808-6a77-7002-9fc9-632d54829793",
  type: "page-type/show-collection",
  slug: "award-winning-shows",
  title: "Award-winning Shows",
  partOfCollections: ["show-collection/shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-applicable",
} as const satisfies ShowCollection
