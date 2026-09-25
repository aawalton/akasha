import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const proverbs = {
  id: "01a06808-34da-7026-847e-ce6b4f79188e",
  type: "page-type/scripture-collection",
  slug: "proverbs",
  title: "Proverbs",
  partOfCollections: ["scripture-collection/old-testament"],
  position: 20,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "proverbs",
} as const satisfies ScriptureCollection
