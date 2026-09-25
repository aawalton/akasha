import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const amos = {
  id: "01a06808-34d9-7018-9880-e5bb9f2bf4d1",
  type: "page-type/scripture-collection",
  slug: "amos",
  title: "Amos",
  partOfCollections: ["scripture-collection/old-testament"],
  position: 30,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "amos",
} as const satisfies ScriptureCollection
