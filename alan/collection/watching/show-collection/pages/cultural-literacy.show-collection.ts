import type { ShowCollection } from "akasha/alan/collection/watching/show-collection/show-collection.page-type.types.ts"

export const culturalLiteracy = {
  id: "01a06808-6a77-7005-9cd7-46dc8494020d",
  type: "page-type/show-collection",
  slug: "cultural-literacy",
  title: "Cultural Literacy",
  partOfCollections: ["show-collection/shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-applicable",
} as const satisfies ShowCollection
