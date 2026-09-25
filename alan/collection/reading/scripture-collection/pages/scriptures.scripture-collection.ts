import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const scriptures = {
  id: "01a06808-34da-702b-84a5-f8b625849735",
  type: "page-type/scripture-collection",
  slug: "scriptures",
  title: "Scriptures",
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-applicable",
} as const satisfies ScriptureCollection
