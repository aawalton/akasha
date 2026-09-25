import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const scriptureCollection2Peter = {
  id: "01a06808-34d9-700e-8f30-0b505856e8fb",
  type: "page-type/scripture-collection",
  slug: "scripture-collection-2-peter",
  title: "2 Peter",
  partOfCollections: ["scripture-collection/new-testament"],
  position: 22,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "2peter",
} as const satisfies ScriptureCollection
