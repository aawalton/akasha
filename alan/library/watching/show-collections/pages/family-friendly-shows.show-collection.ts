import type { ShowCollection } from "../show-collection.page-type.types.ts"

export const familyFriendlyShows = {
  id: "01a06808-6a77-7007-bb2f-714dadc112de",
  pageTypeSlug: "show-collection",
  type: "show-collection",
  slug: "family-friendly-shows",
  title: "Family Friendly Shows",
  partOfCollections: ["shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "not-applicable",
} as const satisfies ShowCollection
