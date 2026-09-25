import type { ShowCollection } from "akasha/alan/collection/watching/show-collection/show-collection.page-type.types.ts"

export const crimeInvestigationShows = {
  id: "01a06808-6a77-7004-b162-a5805225c040",
  type: "page-type/show-collection",
  slug: "crime-investigation-shows",
  title: "Crime Investigation Shows",
  partOfCollections: ["show-collection/shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-applicable",
} as const satisfies ShowCollection
