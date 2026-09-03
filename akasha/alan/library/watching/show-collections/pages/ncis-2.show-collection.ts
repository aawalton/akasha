import type { ShowCollection } from "../show-collection.page-type.ts"

export const ncis2 = {
  id: "01a06808-6a77-700b-a2e7-4ee5f7597a43",
  pageTypeSlug: "show-collection",
  slug: "ncis-2",
  title: "NCIS",
  partOfSlugs: ["crime-investigation-shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
} as const satisfies ShowCollection
