import type { ScriptureCollection } from "akasha/alan/library/reading/scripture-collections/scripture-collection.page-type.types.ts"

export const ruth = {
  id: "01a06808-34da-702a-b3a9-17bb798be958",
  type: "scripture-collection",
  slug: "ruth",
  title: "Ruth",
  partOfCollections: ["old-testament"],
  position: 8,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
  externalId: "ruth",
} as const satisfies ScriptureCollection
