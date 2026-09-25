import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const jonah = {
  id: "01a06808-34da-700a-a8e4-bc02c51e7c36",
  type: "page-type/scripture-collection",
  slug: "jonah",
  title: "Jonah",
  partOfCollections: ["scripture-collection/old-testament"],
  position: 32,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "jonah",
} as const satisfies ScriptureCollection
