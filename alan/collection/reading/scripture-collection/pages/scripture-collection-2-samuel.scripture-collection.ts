import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const scriptureCollection2Samuel = {
  id: "01a06808-34d9-700f-a5d1-1328c16b385b",
  type: "page-type/scripture-collection",
  slug: "scripture-collection-2-samuel",
  title: "2 Samuel",
  partOfCollections: ["scripture-collection/old-testament"],
  position: 10,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "2samuel",
} as const satisfies ScriptureCollection
