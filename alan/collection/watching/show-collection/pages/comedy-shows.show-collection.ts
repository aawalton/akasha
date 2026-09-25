import type { ShowCollection } from "akasha/alan/collection/watching/show-collection/show-collection.page-type.types.ts"

export const comedyShows = {
  id: "01a06808-6a77-7003-9944-a2f235e7ba3f",
  type: "page-type/show-collection",
  slug: "comedy-shows",
  title: "Comedy Shows",
  partOfCollections: ["show-collection/shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-applicable",
} as const satisfies ShowCollection
