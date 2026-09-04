import type { ShowCollection } from "../show-collection.page-type.ts"

export const animeShows = {
  id: "01a06808-6a77-7000-af3c-d6655341f91f",
  pageTypeSlug: "show-collection",
  slug: "anime-shows",
  title: "Anime Shows",
  partOfSlugs: ["shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-applicable",
} as const satisfies ShowCollection
