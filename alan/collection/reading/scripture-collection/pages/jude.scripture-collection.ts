import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const jude = {
  id: "01a06808-34da-700e-a5d5-4bdaf78efcb6",
  type: "page-type/scripture-collection",
  slug: "jude",
  title: "Jude",
  partOfCollections: ["scripture-collection/new-testament"],
  position: 26,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "jude",
} as const satisfies ScriptureCollection
