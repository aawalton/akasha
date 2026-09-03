import type { ShowCollection } from "../show-collection.page-type.ts"

export const phineasAndFerb = {
  id: "01a06808-6a77-700c-b741-b18ec0c15e36",
  pageTypeSlug: "show-collection",
  slug: "phineas-and-ferb",
  title: "Phineas and Ferb",
  partOfSlugs: ["family-friendly-shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
} as const satisfies ShowCollection
