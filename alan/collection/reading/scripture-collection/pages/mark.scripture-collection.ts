import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const mark = {
  id: "01a06808-34da-7014-90a5-5263ff9bcbe9",
  type: "page-type/scripture-collection",
  slug: "mark",
  title: "Mark",
  partOfCollections: ["scripture-collection/new-testament"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "mark",
} as const satisfies ScriptureCollection
