import type { ShowCollection } from "../show-collection.page-type.ts"

export const culturalLiteracy = {
  id: "01a06808-6a77-7005-9cd7-46dc8494020d",
  pageTypeSlug: "show-collection",
  slug: "cultural-literacy",
  title: "Cultural Literacy",
  partOfSlugs: ["shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-applicable",
} as const satisfies ShowCollection
