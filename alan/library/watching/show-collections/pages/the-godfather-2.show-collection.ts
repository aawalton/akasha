import type { ShowCollection } from "../show-collection.page-type.ts"

export const theGodfather2 = {
  id: "01a06808-6a77-7012-8ffc-0af60db64d60",
  pageTypeSlug: "show-collection",
  slug: "the-godfather-2",
  title: "The Godfather",
  partOfSlugs: ["cultural-literacy"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
} as const satisfies ShowCollection
