import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const leviticus = {
  id: "01a06808-34da-7011-b4d2-294b1f776be4",
  type: "page-type/scripture-collection",
  slug: "leviticus",
  title: "Leviticus",
  partOfCollections: ["scripture-collection/old-testament"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "leviticus",
} as const satisfies ScriptureCollection
