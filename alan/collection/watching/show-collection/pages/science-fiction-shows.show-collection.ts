import type { ShowCollection } from "akasha/alan/collection/watching/show-collection/show-collection.page-type.types.ts"

export const scienceFictionShows = {
  id: "01a06808-6a77-700d-b6fd-dfe69b76841d",
  type: "page-type/show-collection",
  slug: "science-fiction-shows",
  title: "Science Fiction Shows",
  partOfCollections: ["show-collection/shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-applicable",
} as const satisfies ShowCollection
