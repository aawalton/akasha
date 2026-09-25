import type { ShowCollection } from "akasha/alan/collection/watching/show-collection/show-collection.page-type.types.ts"

export const animeShows = {
  id: "01a06808-6a77-7000-af3c-d6655341f91f",
  type: "page-type/show-collection",
  slug: "anime-shows",
  title: "Anime Shows",
  partOfCollections: ["show-collection/shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-applicable",
} as const satisfies ShowCollection
