import type { ShowCollection } from "../show-collection.page-type.ts"

export const scienceFictionShows = {
  id: "01a06808-6a77-700d-b6fd-dfe69b76841d",
  pageTypeSlug: "show-collection",
  slug: "science-fiction-shows",
  title: "Science Fiction Shows",
  partOfSlugs: ["shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-applicable",
} as const satisfies ShowCollection
