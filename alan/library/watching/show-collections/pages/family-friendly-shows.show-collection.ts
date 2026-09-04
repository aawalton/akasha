import type { ShowCollection } from "../show-collection.page-type.ts"

export const familyFriendlyShows = {
  id: "01a06808-6a77-7007-bb2f-714dadc112de",
  pageTypeSlug: "show-collection",
  slug: "family-friendly-shows",
  title: "Family Friendly Shows",
  partOfSlugs: ["shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-applicable",
} as const satisfies ShowCollection
