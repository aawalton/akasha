import type { ScriptureCollection } from "akasha/alan/library/reading/scripture-collections/scripture-collection.page-type.types.ts"

export const luke = {
  id: "01a06808-34da-7012-9add-2e0be31817b4",
  type: "scripture-collection",
  slug: "luke",
  title: "Luke",
  partOfCollections: ["scripture-collection/new-testament"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "luke",
} as const satisfies ScriptureCollection
