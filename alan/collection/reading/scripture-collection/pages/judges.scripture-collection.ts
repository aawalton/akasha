import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const judges = {
  id: "01a06808-34da-700f-8763-189cfb3fda26",
  type: "page-type/scripture-collection",
  slug: "judges",
  title: "Judges",
  partOfCollections: ["scripture-collection/old-testament"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "judges",
} as const satisfies ScriptureCollection
