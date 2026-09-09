import type { ShowCollection } from "../show-collection.page-type.ts"

export const dungeonsAndDragonsShows = {
  id: "01a06808-6a77-7006-819d-378765a98da2",
  pageTypeSlug: "show-collection",
  type: "show-collection",
  slug: "dungeons-and-dragons-shows",
  title: "Dungeons and Dragons Shows",
  partOfCollections: ["dungeons-and-dragons"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "not-applicable",
} as const satisfies ShowCollection
