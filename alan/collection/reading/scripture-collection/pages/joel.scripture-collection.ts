import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const joel = {
  id: "01a06808-34da-7008-9aae-f3a793590007",
  type: "page-type/scripture-collection",
  slug: "joel",
  title: "Joel",
  partOfCollections: ["scripture-collection/old-testament"],
  position: 29,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "joel",
} as const satisfies ScriptureCollection
