import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const scriptureCollection1Samuel = {
  id: "01a06808-34d9-7006-a8dd-ed9857b8bdd3",
  type: "page-type/scripture-collection",
  slug: "scripture-collection-1-samuel",
  title: "1 Samuel",
  partOfCollections: ["scripture-collection/old-testament"],
  position: 9,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "1samuel",
} as const satisfies ScriptureCollection
