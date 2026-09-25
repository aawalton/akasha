import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const haggai = {
  id: "01a06808-34d9-702a-90d7-6e77471be211",
  type: "page-type/scripture-collection",
  slug: "haggai",
  title: "Haggai",
  partOfCollections: ["scripture-collection/old-testament"],
  position: 37,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "haggai",
} as const satisfies ScriptureCollection
