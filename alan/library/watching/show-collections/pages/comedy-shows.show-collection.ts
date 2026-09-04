import type { ShowCollection } from "../show-collection.page-type.ts"

export const comedyShows = {
  id: "01a06808-6a77-7003-9944-a2f235e7ba3f",
  pageTypeSlug: "show-collection",
  slug: "comedy-shows",
  title: "Comedy Shows",
  partOfSlugs: ["shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-applicable",
} as const satisfies ShowCollection
