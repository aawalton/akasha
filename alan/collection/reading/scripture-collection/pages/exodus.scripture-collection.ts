import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const exodus = {
  id: "01a06808-34d9-7024-818f-56a89c43170d",
  type: "page-type/scripture-collection",
  slug: "exodus",
  title: "Exodus",
  partOfCollections: ["scripture-collection/old-testament"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "exodus",
} as const satisfies ScriptureCollection
