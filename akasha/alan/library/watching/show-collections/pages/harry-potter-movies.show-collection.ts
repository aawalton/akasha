import type { ShowCollection } from "../show-collection.page-type.ts"

export const harryPotterMovies = {
  id: "01a06808-6a77-700a-8767-b6fcfa40f34a",
  pageTypeSlug: "show-collection",
  slug: "harry-potter-movies",
  title: "Harry Potter Movies",
  partOfSlugs: ["harry-potter"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "following",
  rank: "B",
  lastSyncedAt: "2025-10-01",
} as const satisfies ShowCollection
