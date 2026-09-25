import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const habakkuk = {
  id: "01a06808-34d9-7029-9fa2-96b741d3dd6c",
  type: "page-type/scripture-collection",
  slug: "habakkuk",
  title: "Habakkuk",
  partOfCollections: ["scripture-collection/old-testament"],
  position: 35,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "habakkuk",
} as const satisfies ScriptureCollection
