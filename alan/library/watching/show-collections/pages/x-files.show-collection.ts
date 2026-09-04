import type { ShowCollection } from "../show-collection.page-type.ts"

export const xFiles = {
  id: "01a06808-6a77-7018-9efe-6fe48d04cfca",
  pageTypeSlug: "show-collection",
  slug: "x-files",
  title: "X-Files",
  partOfSlugs: ["science-fiction-fandoms", "speculative-antholoagies"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  rank: "C",
  tags: ["Speculative Anthology", "Crime Investigation"],
} as const satisfies ShowCollection
