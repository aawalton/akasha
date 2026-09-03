import type { ShowCollection } from "../show-collection.page-type.ts"

export const sitcoms = {
  id: "01a06808-6a77-700f-a93d-6b21007f60d5",
  pageTypeSlug: "show-collection",
  slug: "sitcoms",
  title: "Sitcoms",
  partOfSlugs: ["shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-applicable",
} as const satisfies ShowCollection
