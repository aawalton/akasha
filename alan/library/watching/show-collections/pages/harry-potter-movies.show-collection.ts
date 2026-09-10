import type { ShowCollection } from "../show-collection.page-type.types.ts"

export const harryPotterMovies = {
  id: "01a06808-6a77-700a-8767-b6fcfa40f34a",
  pageTypeSlug: "show-collection",
  type: "show-collection",
  slug: "harry-potter-movies",
  title: "Harry Potter Movies",
  partOfCollections: ["harry-potter"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "following",
  rank: "B",
  lastSyncedAt: "2025-10-01",
} as const satisfies ShowCollection
