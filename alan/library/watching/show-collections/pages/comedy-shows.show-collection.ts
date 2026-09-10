import type { ShowCollection } from "../show-collection.page-type.types.ts"

export const comedyShows = {
  id: "01a06808-6a77-7003-9944-a2f235e7ba3f",
  pageTypeSlug: "show-collection",
  type: "show-collection",
  slug: "comedy-shows",
  title: "Comedy Shows",
  partOfCollections: ["shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "not-applicable",
} as const satisfies ShowCollection
