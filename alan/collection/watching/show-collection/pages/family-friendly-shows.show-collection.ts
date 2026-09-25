import type { ShowCollection } from "akasha/alan/collection/watching/show-collection/show-collection.page-type.types.ts"

export const familyFriendlyShows = {
  id: "01a06808-6a77-7007-bb2f-714dadc112de",
  type: "page-type/show-collection",
  slug: "family-friendly-shows",
  title: "Family Friendly Shows",
  partOfCollections: ["show-collection/shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-applicable",
} as const satisfies ShowCollection
