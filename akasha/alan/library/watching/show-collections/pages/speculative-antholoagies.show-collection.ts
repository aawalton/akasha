import type { ShowCollection } from "../show-collection.page-type.ts"

export const speculativeAntholoagies = {
  id: "01a06808-6a77-7010-bb27-6c9f0e56be3f",
  pageTypeSlug: "show-collection",
  slug: "speculative-antholoagies",
  title: "Speculative AntholoAgies",
  partOfSlugs: ["shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-applicable",
} as const satisfies ShowCollection
