import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const zephaniah = {
  id: "01a06808-34da-7031-87df-ffb6b7c4f9f7",
  type: "page-type/scripture-collection",
  slug: "zephaniah",
  title: "Zephaniah",
  partOfCollections: ["scripture-collection/old-testament"],
  position: 36,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "zephaniah",
} as const satisfies ScriptureCollection
