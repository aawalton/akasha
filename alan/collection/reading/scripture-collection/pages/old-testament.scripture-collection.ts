import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const oldTestament = {
  id: "01a06808-34da-7021-b812-782b7750429c",
  type: "page-type/scripture-collection",
  slug: "old-testament",
  title: "Old Testament",
  partOfCollections: ["scripture-collection/scriptures"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "oldtestament",
} as const satisfies ScriptureCollection
