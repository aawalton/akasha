import type { ScriptureCollection } from "akasha/alan/library/reading/scripture-collections/scripture-collection.page-type.types.ts"

export const genesis = {
  id: "01a06808-34d9-7028-8756-630f4b736470",
  type: "scripture-collection",
  slug: "genesis",
  title: "Genesis",
  partOfCollections: ["old-testament"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
  externalId: "genesis",
} as const satisfies ScriptureCollection
