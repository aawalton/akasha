import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const scriptureCollection1Thessalonians = {
  id: "01a06808-34d9-7007-ba82-69d6e2f0e616",
  type: "page-type/scripture-collection",
  slug: "scripture-collection-1-thessalonians",
  title: "1 Thessalonians",
  partOfCollections: ["scripture-collection/new-testament"],
  position: 13,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "1thessalonians",
} as const satisfies ScriptureCollection
