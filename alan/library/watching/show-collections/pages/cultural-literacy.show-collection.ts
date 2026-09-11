import type { ShowCollection } from "akasha/alan/library/watching/show-collections/show-collection.page-type.types.ts"

export const culturalLiteracy = {
  id: "01a06808-6a77-7005-9cd7-46dc8494020d",
  type: "show-collection",
  slug: "cultural-literacy",
  title: "Cultural Literacy",
  partOfCollections: ["shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "not-applicable",
} as const satisfies ShowCollection
