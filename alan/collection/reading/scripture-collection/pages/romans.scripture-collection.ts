import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const romans = {
  id: "01a06808-34da-7029-bd21-07fbe8fd8c43",
  type: "page-type/scripture-collection",
  slug: "romans",
  title: "Romans",
  partOfCollections: ["scripture-collection/new-testament"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "romans",
} as const satisfies ScriptureCollection
