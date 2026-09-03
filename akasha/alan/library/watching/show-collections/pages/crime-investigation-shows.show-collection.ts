import type { ShowCollection } from "../show-collection.page-type.ts"

export const crimeInvestigationShows = {
  id: "01a06808-6a77-7004-b162-a5805225c040",
  pageTypeSlug: "show-collection",
  slug: "crime-investigation-shows",
  title: "Crime Investigation Shows",
  partOfSlugs: ["shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-applicable",
} as const satisfies ShowCollection
