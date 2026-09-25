import type { ShowCollection } from "akasha/alan/collection/watching/show-collection/show-collection.page-type.types.ts"

export const phineasAndFerb = {
  id: "01a06808-6a77-700c-b741-b18ec0c15e36",
  type: "page-type/show-collection",
  slug: "phineas-and-ferb",
  title: "Phineas and Ferb",
  partOfCollections: ["show-collection/family-friendly-shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
} as const satisfies ShowCollection
