import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const revelation = {
  id: "01a06808-34da-7028-adda-87d0a417c500",
  type: "page-type/scripture-collection",
  slug: "revelation",
  title: "Revelation",
  partOfCollections: ["scripture-collection/new-testament"],
  position: 27,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "revelation",
} as const satisfies ScriptureCollection
