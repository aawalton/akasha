import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const scriptureCollection2Thessalonians = {
  id: "01a06808-34d9-7010-b225-697e562f40c9",
  type: "page-type/scripture-collection",
  slug: "scripture-collection-2-thessalonians",
  title: "2 Thessalonians",
  partOfCollections: ["scripture-collection/new-testament"],
  position: 14,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "2thessalonians",
} as const satisfies ScriptureCollection
