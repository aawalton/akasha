import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const scriptureCollection2Corinthians = {
  id: "01a06808-34d9-700a-978e-f002640dc83c",
  type: "page-type/scripture-collection",
  slug: "scripture-collection-2-corinthians",
  title: "2 Corinthians",
  partOfCollections: ["scripture-collection/new-testament"],
  position: 8,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "2corinthians",
} as const satisfies ScriptureCollection
