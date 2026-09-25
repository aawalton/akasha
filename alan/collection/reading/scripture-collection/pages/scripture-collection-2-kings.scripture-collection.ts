import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const scriptureCollection2Kings = {
  id: "01a06808-34d9-700c-a0ca-a3aac8cf04b8",
  type: "page-type/scripture-collection",
  slug: "scripture-collection-2-kings",
  title: "2 Kings",
  partOfCollections: ["scripture-collection/old-testament"],
  position: 12,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "2kings",
} as const satisfies ScriptureCollection
