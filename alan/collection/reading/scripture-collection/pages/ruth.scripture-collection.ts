import type { ScriptureCollection } from "akasha/alan/collection/reading/scripture-collection/scripture-collection.page-type.types.ts"

export const ruth = {
  id: "01a06808-34da-702a-b3a9-17bb798be958",
  type: "page-type/scripture-collection",
  slug: "ruth",
  title: "Ruth",
  partOfCollections: ["scripture-collection/old-testament"],
  position: 8,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalId: "ruth",
} as const satisfies ScriptureCollection
